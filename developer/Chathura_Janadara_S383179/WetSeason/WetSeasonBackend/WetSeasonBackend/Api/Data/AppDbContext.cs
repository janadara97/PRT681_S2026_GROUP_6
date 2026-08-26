using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Incident>  Incidents => Set<Incident>();
    public DbSet<Community> Communities => Set<Community>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<User> Users => Set<User>();
    public DbSet<ResourceAssignement> ResourceAssignements => Set<ResourceAssignement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}