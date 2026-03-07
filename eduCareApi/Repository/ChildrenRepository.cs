using eduCareApi.DTO;
using eduCareApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eduCareApi.Repositories
{
    public class ChildrenRepository
    {
        private readonly AppDbContext _context;

        public ChildrenRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ChildrenDto>> GetAllAsync()
        {
            return await _context.Childrens
                .Select(s => new ChildrenDto
                {
                    ID = s.ID,
                    Name = s.Name,
                    Surname = s.Surname,
                    ParentID = s.ParentID,
                    AgeID = s.AgeID,
                    ClassID = s.ClassID,
                    Status = s.Status
                })
                .ToListAsync();
        }

        public async Task<ChildrenDto> GetByIdAsync(int id)
        {
            var s = await _context.Childrens.FindAsync(id);
            if (s == null) return null;

            return new ChildrenDto
            {
                ID = s.ID,
                Name = s.Name,
                Surname = s.Surname,
                ParentID = s.ParentID,
                AgeID = s.AgeID,
                ClassID = s.ClassID,
                Status = s.Status
            };
        }

        public async Task<ChildrenDto> AddAsync(ChildrenDto child)
        {
            var entity = new Children
            {
                Name = child.Name,
                Surname = child.Surname,
                ParentID = child.ParentID,
                AgeID = child.AgeID,
                ClassID = child.ClassID,
                Status = child.Status
            };

            _context.Childrens.Add(entity);
            await _context.SaveChangesAsync();

            child.ID = entity.ID;
            return child;
        }

        public async Task<ChildrenDto> UpdateAsync(ChildrenDto child)
        {
            var entity = await _context.Childrens.FindAsync(child.ID);
            if (entity == null) return null;

            entity.Name = child.Name;
            entity.Surname = child.Surname;
            entity.ParentID = child.ParentID;
            entity.AgeID = child.AgeID;
            entity.ClassID = child.ClassID;
            entity.Status = child.Status;

            await _context.SaveChangesAsync();
            return child;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Childrens.FindAsync(id);
            if (entity == null) return false;

            _context.Childrens.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}