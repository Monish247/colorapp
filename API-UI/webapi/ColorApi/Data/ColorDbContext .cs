using ColorApi.models;
using Microsoft.EntityFrameworkCore;

namespace ColorApi.Data
{
    public class ColorDbContext : DbContext
    {
        public ColorDbContext(DbContextOptions<ColorDbContext> options) : base(options)
        {
        }

        public DbSet<Color> Colors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed some initial colors
            modelBuilder.Entity<Color>().HasData(
                new Color { Id = 1, Name = "Red", HexCode = "#FF0000", CreatedAt = DateTime.UtcNow },
                new Color { Id = 2, Name = "Green", HexCode = "#00FF00", CreatedAt = DateTime.UtcNow },
                new Color { Id = 3, Name = "Blue", HexCode = "#0000FF", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}
