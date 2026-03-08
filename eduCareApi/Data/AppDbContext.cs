using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using eduCare.Models;
using eduCareApi.Models;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Roles> Roles { get; set; }
    public DbSet<Children> Childrens { get; set; }
    public DbSet<Educators> Educators { get; set; }
    public DbSet<Educators> Allergy { get; set; }
    public DbSet<Educators> ChildrenEducators { get; set; }
    public DbSet<AgeGroup> AgeGroups { get; set; }
}