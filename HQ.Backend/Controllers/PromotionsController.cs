using HQ.Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PromotionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPromotions()
        {
            var promotions = await _context.Promotions
                .Where(p => p.Status == 1 && p.EndDate >= DateTime.Now) // Dùng Status thay cho Active
                .Select(p => new {
                    p.Id,
                    p.Code,
                    p.Description,
                    p.DiscountValue,
                    p.DiscountType,
                    DiscountText = p.DiscountType == "Percentage" ? p.DiscountValue + "%" : p.DiscountValue + "đ",
                    StartDate = p.StartDate.ToString("dd/MM/yyyy"),
                    EndDate = p.EndDate.ToString("dd/MM/yyyy")
                })
                .OrderByDescending(p => p.Id)
                .ToListAsync();

            return Ok(promotions);
        }

        [HttpGet("validate/{code}")]
        public async Task<IActionResult> ValidatePromotion(string code)
        {
            var promotion = await _context.Promotions
                .Where(p => p.Status == 1 && p.EndDate >= DateTime.Now && p.Code == code)
                .Select(p => new {
                    p.Code,
                    p.Description,
                    p.DiscountValue,
                    p.DiscountType
                })
                .FirstOrDefaultAsync();

            if (promotion == null)
            {
                return NotFound(new { message = "Mã giảm giá không hợp lệ hoặc đã hết hạn." });
            }

            return Ok(promotion);
        }
    }
}