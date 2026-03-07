using eduCareApi.DTO;
using eduCareApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eduCareApi.Repositories
{
    public class EducatorsRepository
    {
        private readonly AppDbContext _context;

        public EducatorsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EducatorsDto>> GetAllAsync()
        {
            return await _context.Educators
                .Select(e => new EducatorsDto
                {
                    ID = e.ID,
                    UserID = e.UserID,
                    SpecializimetID = e.SpecializimetID,
                    Status = e.Status,
                    K1 = e.K1,
                    K2 = e.K2,
                    K3 = e.K3
                })
                .ToListAsync();
        }

        public async Task<EducatorsDto> GetByIdAsync(int id)
        {
            var e = await _context.Educators.FindAsync(id);
            if (e == null) return null;

            return new EducatorsDto
            {
                ID = e.ID,
                UserID = e.UserID,
                SpecializimetID = e.SpecializimetID,
                Status = e.Status,
                K1 = e.K1,
                K2 = e.K2,
                K3 = e.K3
            };
        }

        public async Task<EducatorsDto> AddAsync(EducatorsDto educator)
        {
            var entity = new Educators
            {
                UserID = educator.UserID,
                SpecializimetID = educator.SpecializimetID,
                Status = educator.Status,
                K1 = educator.K1,
                K2 = educator.K2,
                K3 = educator.K3
            };

            _context.Educators.Add(entity);
            await _context.SaveChangesAsync();

            educator.ID = entity.ID;
            return educator;
        }

        public async Task<EducatorsDto> UpdateAsync(EducatorsDto educator)
        {
            var entity = await _context.Educators.FindAsync(educator.ID);
            if (entity == null) return null;

            entity.UserID = educator.UserID;
            entity.SpecializimetID = educator.SpecializimetID;
            entity.Status = educator.Status;
            entity.K1 = educator.K1;
            entity.K2 = educator.K2;
            entity.K3 = educator.K3;

            await _context.SaveChangesAsync();
            return educator;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Educators.FindAsync(id);
            if (entity == null) return false;

            _context.Educators.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}