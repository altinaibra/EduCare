using eduCareApi.DTO;
using eduCareApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eduCareApi.Repositories
{
    public class AgeGroupRepository
    {
        private readonly AppDbContext _context;

        public AgeGroupRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AgeGroupDto>> GetAllAsync()
        {
            return await _context.AgeGroups
                .Select(a => new AgeGroupDto
                {
                    Id = a.Id,
                    AgeRange = a.AgeRange,
                    NumberOfClasses = a.NumberOfClasses,
                    EducatorName = a.EducatorName,
                    Status = a.Status

                })
                .ToListAsync();
        }

        public async Task<AgeGroupDto> GetByIdAsync(int id)
        {
            var a = await _context.AgeGroups.FindAsync(id);
            if (a == null) return null;

            return new AgeGroupDto
            {
                Id = a.Id,
                AgeRange = a.AgeRange,
                NumberOfClasses = a.NumberOfClasses,
                EducatorName = a.EducatorName,
                Status = a.Status
            };
        }

        public async Task<AgeGroupDto> AddAsync(AgeGroupDto ageGroup)
        {
            var entity = new AgeGroup
            {
                AgeRange = ageGroup.AgeRange,
                NumberOfClasses = ageGroup.NumberOfClasses,
                EducatorName = ageGroup.EducatorName,
                Status = ageGroup.Status
            };

            _context.AgeGroups.Add(entity);
            await _context.SaveChangesAsync();

            ageGroup.Id = entity.Id;
            return ageGroup;
        }

        public async Task<AgeGroupDto> UpdateAsync(AgeGroupDto ageGroup)
        {
            var entity = await _context.AgeGroups.FindAsync(ageGroup.Id);
            if (entity == null) return null;

            entity.AgeRange = ageGroup.AgeRange;
            entity.NumberOfClasses = ageGroup.NumberOfClasses;
            entity.EducatorName = ageGroup.EducatorName;
            entity.Status = ageGroup.Status;

            await _context.SaveChangesAsync();
            return ageGroup;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.AgeGroups.FindAsync(id);
            if (entity == null) return false;

            _context.AgeGroups.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}