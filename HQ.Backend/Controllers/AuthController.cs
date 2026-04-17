﻿using Google.Apis.Auth;
using HQ.Backend.Data;
using HQ.Backend.DTOs;
using HQ.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
// Controller xử lý đăng ký, đăng nhập và đăng nhập Google
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
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "Customer"; // Default role assignment
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            Console.WriteLine($"User Role: {user.Role}"); // Log role for debugging

            var fakeToken = "HQ-STORE-TOKEN-" + Guid.NewGuid().ToString();

             // Ensure role is returned correctly
            var userRole = user.Role ?? "Customer";

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                token = fakeToken,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    full_name = user.FullName,
                    role = userRole,
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
                else if (string.IsNullOrEmpty(user.Role))
                {
                    user.Role = "Customer";
                    _context.Users.Update(user);
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
                        role = user.Role ?? "Customer",
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

        [HttpGet("verify-admin/{id}")]
        public async Task<IActionResult> VerifyAdmin(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Không tìm thấy người dùng!" });

            if (string.IsNullOrEmpty(user.Role) || !user.Role.Equals("Admin", StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập trang quản trị!" });
            }

            return Ok(new { message = "Xác thực Admin thành công!" });
        }
    }
}