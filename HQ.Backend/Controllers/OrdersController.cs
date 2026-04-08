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
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            // 1. Tạo mã đơn hàng duy nhất (Ví dụ: HQ + 6 số cuối của Ticks)
            string orderCode = "HQ" + DateTime.Now.Ticks.ToString().Substring(12);

            var newOrder = new Order
            {
                UserId = dto.UserId,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address,
                TotalAmount = dto.TotalAmount,
                OrderCode = orderCode,
                Status = "Pending", // Mặc định là chờ thanh toán
                OrderDate = DateTime.Now,
                PaymentDate = null // Chưa thanh toán nên để null
            };

            try
            {
                _context.Set<Order>().Add(newOrder);
                await _context.SaveChangesAsync();

                // Trả về orderCode để Frontend chuyển sang trang Payment
                return Ok(newOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lưu đơn hàng: " + ex.Message });
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