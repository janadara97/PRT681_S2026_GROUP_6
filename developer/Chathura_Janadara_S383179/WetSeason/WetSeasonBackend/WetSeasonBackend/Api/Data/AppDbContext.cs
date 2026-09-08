using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data;

// DbContext is EF Core's "unit of work" - it tracks entities you load/add
// and writes all changes to the DB in one SaveChangesAsync() call. Similar
// role to a JPA EntityManager or Laravel's underlying DB connection.
public class AppDbContext : DbContext
{
    // Options (connection string, provider) are injected via DI - see
    // AddDbContext<AppDbContext>(...) in Program.cs.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Each DbSet<T> represents a table and is the entry point for querying
    // it, e.g. db.Incidents.Where(...) - similar to a JPA Repository<T> or
    // an Eloquent Model::query().
    public DbSet<Incident>  Incidents => Set<Incident>();
    public DbSet<Community> Communities => Set<Community>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<User> Users => Set<User>();
    public DbSet<ResourceAssignement> ResourceAssignements => Set<ResourceAssignement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Instead of configuring every entity here, EF Core scans this
        // assembly for classes implementing IEntityTypeConfiguration<T>
        // (see Api/Data/Configurations/) and applies each one. This is
        // the Fluent API equivalent of JPA annotations or orm.xml, kept
        // in separate files so this class stays uncluttered.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
