using Google.Apis.Auth;
using HQ.Backend.Data;
using HQ.Backend.DTOs;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if (await _context.Users.AnyAsync(u => u.email == user.email))
                return BadRequest(new { message = "Email đã được sử dụng!" });

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == request.Email);
            if (user == null || user.password != request.Password)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác!" });
            }
            var fakeToken = "HQ-STORE-TOKEN-" + Guid.NewGuid().ToString();

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                token = fakeToken,
                user = new
                {
                    id = user.Id,
                    email = user.email,
                }
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { "249381559845-1s30c3kjmaeic2v35il5vjqir9930pq2.apps.googleusercontent.com" }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);
                var user = await _context.Users.FirstOrDefaultAsync(u => u.email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        email = payload.Email,
                        full_name = payload.Name,
                        password = Guid.NewGuid().ToString(), 
                        role = "Customer",
                        created_at = DateTime.Now
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }
                return Ok(new
                {
                    message = "Đăng nhập Google thành công",
                    user = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xác thực Google thất bại", error = ex.Message });
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
