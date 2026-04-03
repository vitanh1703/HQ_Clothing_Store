using HQ.Backend.Data;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
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
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // 1. Tìm user trong Database theo Email
            // Sử dụng SingleOrDefaultAsync hoặc FirstOrDefaultAsync từ Entity Framework
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

            // 2. Kiểm tra user có tồn tại và mật khẩu có khớp không
            if (user == null || user.Password != request.Password)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác!" });
            }

            // 3. Giả lập trả về Token (Sau này bạn sẽ dùng JWT ở đây)
            // Hiện tại trả về một chuỗi string ngẫu nhiên để Frontend lưu vào LocalStorage
            var fakeToken = "HQ-STORE-TOKEN-" + Guid.NewGuid().ToString();

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                token = fakeToken,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.Username
                }
            });
        }
    }
    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
