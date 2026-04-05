using Google.Apis.Auth;
using HQ.Backend.Data;
using HQ.Backend.DTOs;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

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
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest(new { message = "Email đã được sử dụng!" });

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.CreatedAt = DateTime.Now;
            user.Status = true;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác!" });
            }

            if (!user.Status)
            {
                return BadRequest(new { message = "Tài khoản của bạn đã bị khóa!" });
            }

            var fakeToken = "HQ-STORE-TOKEN-" + Guid.NewGuid().ToString();

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                token = fakeToken,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    full_name = user.FullName,
                    role = user.Role,
                    avatar = user.AvatarUrl,
                    address = user.Address,
                    phone = user.Phone
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
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Email = payload.Email,
                        FullName = payload.Name,
                        Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                        Role = "Customer",
                        AuthProvider = "google",
                        GoogleId = payload.Subject,
                        AvatarUrl = payload.Picture,
                        Status = true,
                        CreatedAt = DateTime.Now
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    message = "Đăng nhập Google thành công",
                    token = "HQ-STORE-GOOGLE-TOKEN-" + Guid.NewGuid().ToString(),
                    user = new
                    {
                        id = user.Id,
                        email = user.Email,
                        full_name = user.FullName,
                        avatar = user.AvatarUrl,
                        address = user.Address,
                        phone = user.Phone
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xác thực Google thất bại", error = ex.Message });
            }
        }

        [HttpPost("change-password")]
            public async Task<IActionResult> ChangePassword([FromBody] DTOs.ChangePasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
            if (user == null)
                return NotFound(new { message = "Không tìm thấy người dùng!" });

            if (user.AuthProvider == "google")
                return BadRequest(new { message = "Tài khoản đăng nhập bằng Google không thể đổi mật khẩu!" });

            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password))
                return BadRequest(new { message = "Mật khẩu cũ không chính xác!" });

            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Đổi mật khẩu thành công!" });
        }
    }
}