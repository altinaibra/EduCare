using eduCareApi.DTO;
using eduCareApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eduCareApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChildrenController : ControllerBase
    {
        private readonly ChildrenRepository _repository;

        public ChildrenController(ChildrenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChildrenDto>>> GetAll() =>
            Ok(await _repository.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<ChildrenDto>> GetById(int id)
        {
            var child = await _repository.GetByIdAsync(id);
            if (child == null) return NotFound();
            return Ok(child);
        }

        [HttpPost]
        public async Task<ActionResult<ChildrenDto>> Create([FromBody] ChildrenDto child)
        {
            var created = await _repository.AddAsync(child);
            return CreatedAtAction(nameof(GetById), new { id = created.ID }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ChildrenDto>> Update(int id, [FromBody] ChildrenDto child)
        {
            if (id != child.ID) return BadRequest();
            var updated = await _repository.UpdateAsync(child);
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