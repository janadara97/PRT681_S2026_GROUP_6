using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data;

// DbContext is EF Core's "unit of work" - tracks loaded/added entities and
// writes changes in one SaveChangesAsync() call, like a JPA EntityManager.
public class AppDbContext : DbContext
{
    // Options (connection string, provider) are injected via DI - see
    // AddDbContext<AppDbContext>(...) in Program.cs.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Each DbSet<T> is a table and the entry point for querying it (e.g.
    // db.Incidents.Where(...)) - like a JPA Repository<T> or Eloquent's Model::query().
    public DbSet<Incident>  Incidents => Set<Incident>();
    public DbSet<Community> Communities => Set<Community>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<User> Users => Set<User>();
    public DbSet<ResourceAssignement> ResourceAssignements => Set<ResourceAssignement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Scans this assembly for IEntityTypeConfiguration<T> classes (see
        // Api/Data/Configurations/) instead of configuring every entity inline here.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
