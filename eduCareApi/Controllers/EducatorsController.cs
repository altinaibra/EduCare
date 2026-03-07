using eduCareApi.DTO;
using eduCareApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eduCareApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EducatorsController : ControllerBase
    {
        private readonly EducatorsRepository _repository;

        public EducatorsController(EducatorsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducatorsDto>>> GetAll() =>
            Ok(await _repository.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<EducatorsDto>> GetById(int id)
        {
            var educator = await _repository.GetByIdAsync(id);
            if (educator == null) return NotFound();
            return Ok(educator);
        }

        [HttpPost]
        public async Task<ActionResult<EducatorsDto>> Create([FromBody] EducatorsDto educator)
        {
            var created = await _repository.AddAsync(educator);
            return CreatedAtAction(nameof(GetById), new { id = created.ID }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EducatorsDto>> Update(int id, [FromBody] EducatorsDto educator)
        {
            if (id != educator.ID) return BadRequest();
            var updated = await _repository.UpdateAsync(educator);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}