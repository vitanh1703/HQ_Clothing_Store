using HQ.Backend.Data;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context) { _context = context; }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            // 1. Kiểm tra email tồn tại chưa
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest(new { message = "Email đã được sử dụng!" });

            // 2. Lưu user (Lưu ý: Thực tế nên dùng BCrypt để Hash Password)
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng ký thành công!" });
        }
    }
}
