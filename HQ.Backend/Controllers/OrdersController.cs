using HQ.Backend.Data;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using HQ.Backend.DTOs;
using DocumentFormat.OpenXml.Drawing.Diagrams;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1. Tạo đơn hàng (Bảng orders)
                var order = new Order
                {
                    UserId = request.UserId,
                    OrderCode = GenerateOrderCode(), // Hàm sinh mã đơn hàng của bạn
                    FullName = request.FullName,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address,
                    TotalAmount = request.TotalAmount,
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync(); // Lưu để lấy được order.Id

                // 2. Tạo chi tiết đơn hàng (Bảng order_items)
                if (request.Items != null && request.Items.Any())
                {
                    var orderItems = request.Items.Select(item => new OrderItem
                    {
                        OrderId = order.Id, // ID vừa được sinh ra ở trên
                        VariantId = item.VariantId,
                        Quantity = item.Quantity,
                        PriceAtPurchase = item.PriceAtPurchase
                    }).ToList();

                    _context.OrderItems.AddRange(orderItems);
                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();

                return Ok(new
                {
                    id = order.Id,
                    orderCode = order.OrderCode
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Lỗi khi tạo đơn hàng", error = ex.Message });
            }
        }


        [HttpPost("webhook/casso")]
        public async Task<IActionResult> CassoWebhook([FromBody] CassoWebhookRequest request)
        {
            // 1. Kiểm tra dữ liệu đầu vào
            if (request?.data == null || !request.data.Any())
            {
                return BadRequest(new { error = 1, message = "Không có dữ liệu giao dịch" });
            }

            foreach (var transaction in request.data)
            {
                string tranDescription = transaction.description?.ToUpper() ?? "";
                Console.WriteLine($"Đang xử lý giao dịch: {tranDescription} - Số tiền: {transaction.amount}");

                // 2. Tìm đơn hàng 'Pending' có OrderCode nằm trong nội dung chuyển khoản
                // Sử dụng .AsEnumerable() hoặc truy vấn cẩn thận để tránh lỗi dịch SQL nếu chuỗi phức tạp
                var matchedOrder = await _context.Set<Order>()
                    .FirstOrDefaultAsync(o => o.Status == "Pending" &&
                                             tranDescription.Contains(o.OrderCode.ToUpper()));

                if (matchedOrder != null)
                {
                    // 3. CẬP NHẬT TRẠNG THÁI (Đây là bước bạn đang thiếu)
                    matchedOrder.Status = "Success";
                    matchedOrder.OrderDate = DateTime.UtcNow;

                    Console.WriteLine($"Khớp thành công đơn hàng: {matchedOrder.OrderCode}");
                }
            }

            // 4. Lưu tất cả thay đổi vào DB
            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { error = 0, message = "Xử lý thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = 1, message = "Lỗi Database: " + ex.Message });
            }
        }
    }
}