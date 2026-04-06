using HQ.Backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NewsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            var news = await _context.News
                .Select(n => new {
                    n.Id,
                    n.Category,
                    n.Title,
                    Date = n.PublishDate.ToString("dd/MM"),
                    Img = n.ImgUrl,
                    Desc = n.Description
                })
                .ToListAsync();

            return Ok(news);
        }

        // GET: api/news/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            var news = await _context.News
                .Where(n => n.Id == id)
                .Select(n => new {
                    n.Id,
                    n.Category,
                    n.Title,
                    Date = n.PublishDate.ToString("dd/MM/yyyy"),
                    Img = n.ImgUrl,
                    Desc = n.Description,
                    n.Content // Quan trọng: Lấy thêm nội dung chi tiết
                })
                .FirstOrDefaultAsync();

            if (news == null)
                return NotFound(new { message = "Không tìm thấy tin tức" });

            return Ok(news);
        }
    }
}