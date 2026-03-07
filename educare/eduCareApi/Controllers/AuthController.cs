using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eduCare.Models;

namespace eduCareApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AuthController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Invalid login request." });
            }

            var userQuery = _db.Users.AsQueryable();

            if (string.Equals(request.LoginType, "telephone", StringComparison.OrdinalIgnoreCase))
            {
                if (string.IsNullOrWhiteSpace(request.Telephone))
                {
                    return BadRequest(new { message = "Telephone is required." });
                }

                userQuery = userQuery.Where(u => u.Telephone == request.Telephone);
            }
            else
            {
                if (string.IsNullOrWhiteSpace(request.Username))
                {
                    return BadRequest(new { message = "Username is required." });
                }

                userQuery = userQuery.Where(u => u.Username == request.Username);
            }

            var user = await userQuery.FirstOrDefaultAsync();
            if (user is null || user.Password != request.Password)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            // Temporary token placeholder until JWT issuance is wired.
            const string token = "dev-token";

            return Ok(new
            {
                token,
                userId = user.ID,
                roleId = user.RoleID,
                name = user.Name,
                surname = user.Surname,
                username = user.Username,
                telephone = user.Telephone,
                email = user.Email
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new { success = false, message = "Email is required." });
            }

            var exists = await _db.Users.AnyAsync(u => u.Email == request.Email);
            if (!exists)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            return Ok(new { success = true, message = "Reset code sent (development stub)." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (request is null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new { success = false, message = "Invalid reset request." });
            }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user is null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            user.Password = request.NewPassword;
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Password reset successful." });
        }

        public class LoginRequest
        {
            public string LoginType { get; set; } = "username";
            public string? Username { get; set; }
            public string? Telephone { get; set; }
            public string Password { get; set; } = string.Empty;
        }

        public class ForgotPasswordRequest
        {
            public string Email { get; set; } = string.Empty;
        }

        public class ResetPasswordRequest
        {
            public string Email { get; set; } = string.Empty;
            public string? Code { get; set; }
            public string NewPassword { get; set; } = string.Empty;
        }
    }
}
