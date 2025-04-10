using ColorApi.Data;
using ColorApi.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ColorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColorsController : ControllerBase
    {
        private readonly ColorDbContext _context;

        public ColorsController(ColorDbContext context)
        {
            _context = context;
        }

        // GET: api/colors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            return await _context.Colors.ToListAsync();
        }

        // GET: api/colors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(int id)
        {
            var color = await _context.Colors.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

        // POST: api/colors
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            color.CreatedAt = DateTime.UtcNow;
            _context.Colors.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetColor), new { id = color.Id }, color);
        }

        // DELETE: api/colors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id)
        {
            var color = await _context.Colors.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            _context.Colors.Remove(color);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
