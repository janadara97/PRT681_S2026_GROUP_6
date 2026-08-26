using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data.Configurations;

public class ResourceAssignementConfiguration : IEntityTypeConfiguration<ResourceAssignement>
{
    public void Configure(EntityTypeBuilder<ResourceAssignement> builder)
    {
        builder.Property(a => a.AssignedAt)
            .IsRequired();

        builder.HasOne(a => a.Resource)
            .WithMany(r => r.Assignments)
            .HasForeignKey(a => a.ResourceId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Incident)
            .WithMany(i => i.ResourceAssignements)
            .HasForeignKey(a => a.IncidentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(a => a.ResourceId)
            .IsUnique()
            .HasFilter("[ReleasedAt] IS NULL");
    }
}
