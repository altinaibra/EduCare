using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using eduCare.Models;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Users> Users { get; set; }
    public DbSet<Roles> Roles { get; set; }
}