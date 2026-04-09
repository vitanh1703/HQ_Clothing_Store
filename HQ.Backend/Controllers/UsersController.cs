using HQ.Backend.Data;
using HQ.Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HQ.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPut("{id}/info")]
        public async Task<IActionResult> UpdateInfo(int id, [FromBody] UpdateInfoRequest request)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null) 
                {
                    return NotFound(new { message = "Không tìm thấy người dùng" });
                }

                user.FullName = request.FullName;
                user.Phone = request.Phone;
                user.Address = request.Address;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật thông tin thành công", user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi cập nhật thông tin", error = ex.Message });
            }
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] UpdatePasswordRequest request)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null) 
                {
                    return NotFound(new { message = "Không tìm thấy người dùng" });
                }

                if (string.IsNullOrEmpty(user.Password))
                {
                     return BadRequest(new { message = "Tài khoản liên kết Google không thể đổi mật khẩu." });
                }

                if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.Password))
                {
                    return BadRequest(new { message = "Mật khẩu hiện tại không đúng" });
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đổi mật khẩu thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi đổi mật khẩu", error = ex.Message });
            }
        }
    }
}