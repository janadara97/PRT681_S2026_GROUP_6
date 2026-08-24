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
    public DbSet<ResourceAssignement> ResourceAssignements => Set<ResourceAssignement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var incident = modelBuilder.Entity<Incident>();
        
        incident.Property(i => i.Status)
            .HasConversion<String>()
            .HasMaxLength(50)
            .IsRequired();
        incident.Property(i => i.Type)
            .HasConversion<String>()
            .HasMaxLength(50);
        incident.Property(i => i.Description)
            .HasConversion<String>()
            .HasMaxLength(500)
            .IsRequired();
        incident.Property(i => i.ReportedBy)
            .IsRequired()
            .HasMaxLength(100);

        var community = modelBuilder.Entity<Community>();
        community.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(120);
        community.Property(c => c.Region)
            .IsRequired()
            .HasMaxLength(60);
        community.Property(c => c.ContactEmail)
            .IsRequired()
            .HasMaxLength(100);
        
        community.HasIndex(c => c.Name)
            .IsUnique();

        incident.HasOne(i => i.Community)
            .WithMany(i => i.Incidents)
            .HasForeignKey(i => i.CommunityId)
            .OnDelete(DeleteBehavior.Restrict);
        
        var resource = modelBuilder.Entity<Resource>();
        resource.Property(r => r.Name)
            .IsRequired()
            .HasMaxLength(120);
        resource.Property(r => r.HomeDepot)
            .IsRequired()
            .HasMaxLength(120);
        resource.Property(r=>r.Type)
            .HasConversion<String>()
            .HasMaxLength(30);
        
        var assignment = modelBuilder.Entity<ResourceAssignement>();
        assignment.Property(a => a.AssignedAt)
            .IsRequired();
        
        assignment.HasOne(a => a.Resource)
            .WithMany(r=> r.Assignments)
            .HasForeignKey(a => a.ResourceId)
            .OnDelete(DeleteBehavior.Restrict);
        
        assignment.HasOne(a => a.Incident)
            .WithMany(i => i.ResourceAssignements)
            .HasForeignKey(a => a.IncidentId)
            .OnDelete(DeleteBehavior.Restrict);
        assignment.HasIndex(r=>r.ResourceId)
            .IsUnique()
            .HasFilter("[ReleasedAt] IS NULL");
    }
}