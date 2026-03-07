using Microsoft.AspNetCore.Mvc;
using eduCareApi.Repository;
using eduCare.Models;

namespace eduCareApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public AuthController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest();

            User? user;

            if (request.LoginType == "telephone")
            {
                user = await _userRepository.GetByPhoneAsync(request.Telephone);
            }
            else
            {
                user = await _userRepository.GetByUsernameAsync(request.Username);
            }

            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });




            return Ok(new
            {
                token = "dev-token",
                userId = user.ID,
                roleId = user.RoleID,
                name = user.Name,
                surname = user.Surname,
                username = user.Username,
                telephone = user.Phone,
                email = user.Email
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new User
            {
                Username = request.Username,
                PasswordHash = request.Password,
                Email = request.Email,
                Phone = request.Telephone,
                Name = request.Name,
                Surname = request.Surname,
                RoleID = request.RoleID
            };

            await _userRepository.CreateAsync(user);

            return Ok(new { message = "User created successfully" });
        }

        public class LoginRequest
        {
            public string LoginType { get; set; } = "username";
            public string? Username { get; set; }
            public string? Telephone { get; set; }
            public string Password { get; set; } = "";
        }

        public class RegisterRequest
        {
            public string Username { get; set; } = "";
            public string Password { get; set; } = "";
            public string? Email { get; set; }
            public string? Telephone { get; set; }
            public string? Name { get; set; }
            public string? Surname { get; set; }
            public int RoleID { get; set; }
        }
    }
}