using HQ.Backend.Data;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using HQ.Backend.DTOs;

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

        [HttpGet("check-payment/{orderCode}")]
        public async Task<IActionResult> CheckPayment(string orderCode)
        {
            var order = await _context.Set<Order>()
                .FirstOrDefaultAsync(o => o.OrderCode == orderCode);

            if (order == null)
            {
                return Ok(new { isPaid = false, status = "Pending" });
            }

            bool isPaid = order.Status == "Success";
            return Ok(new { isPaid = isPaid, status = order.Status });
        }

        [HttpPost("webhook/casso")]
        public async Task<IActionResult> CassoWebhook([FromBody] CassoWebhookRequest request)
        {
            if (request?.data == null || !request.data.Any())
            {
                return BadRequest(new { error = 1, message = "Không có dữ liệu giao dịch" });
            }

            foreach (var transaction in request.data)
            {
                if (string.IsNullOrEmpty(transaction.description)) continue;

                string description = transaction.description.ToUpper();
                decimal amount = transaction.amount;
                var matchedOrder = await _context.Set<Order>()
                    .FirstOrDefaultAsync(o =>
                        o.Status == "Pending" &&
                        o.OrderCode != null && 
                        description.Contains(o.OrderCode.ToUpper()));

                if (matchedOrder != null && amount >= matchedOrder.TotalAmount)
                {
                    matchedOrder.Status = "Success";
                    _context.Update(matchedOrder);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { error = 0, message = "Xử lý webhook thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = 1, message = "Lỗi lưu database: " + ex.Message });
            }
        }
    }
}