using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data.Configurations;

public class IncidentConfiguration : IEntityTypeConfiguration<Incident>
{
    public void Configure(EntityTypeBuilder<Incident> builder)
    {
        // HasConversion<string>() stores the enum as text ("Responding")
        // instead of an integer, so the raw DB rows stay human-readable -
        // similar to a Laravel enum cast or JPA's @Enumerated(STRING).
        builder.Property(i => i.Status)
            .HasConversion<String>()
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(i => i.Type)
            .HasConversion<String>()
            .HasMaxLength(50);
        builder.Property(i => i.Description)
            .HasConversion<String>()
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(i => i.ReportedBy)
            .IsRequired()
            .HasMaxLength(100);

        // Defines the FK relationship: many Incidents belong to one
        // Community. Restrict = block deleting a Community that still has
        // Incidents, instead of cascading the delete.
        builder.HasOne(i => i.Community)
            .WithMany(i => i.Incidents)
            .HasForeignKey(i => i.CommunityId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
