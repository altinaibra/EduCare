using eduCareApi.Models;
using Microsoft.EntityFrameworkCore;
using eduCareApi.Helpers;
using eduCare.Models;

namespace eduCareApi.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> GetByPhoneAsync(string phone)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == phone);
        }

        public async Task<User> CreateAsync(User user)
        {
            // Hash password before saving
            user.PasswordHash = PasswordHelper.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}