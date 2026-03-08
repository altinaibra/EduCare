using eduCareApi.DTO;
using eduCareApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eduCareApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgeGroupController : ControllerBase
    {
        private readonly AgeGroupRepository _repository;

        public AgeGroupController(AgeGroupRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgeGroupDto>>> GetAll() =>
            Ok(await _repository.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<AgeGroupDto>> GetById(int id)
        {
            var ageGroup = await _repository.GetByIdAsync(id);
            if (ageGroup == null) return NotFound();
            return Ok(ageGroup);
        }

        [HttpPost]
        public async Task<ActionResult<AgeGroupDto>> Create(AgeGroupDto ageGroup)
        {
            var created = await _repository.AddAsync(ageGroup);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AgeGroupDto>> Update(int id, AgeGroupDto ageGroup)
        {
            if (id != ageGroup.Id) return BadRequest();
            var updated = await _repository.UpdateAsync(ageGroup);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}