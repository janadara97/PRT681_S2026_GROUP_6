using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data.Configurations;

public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder.Property(r => r.Name)
            .IsRequired()
            .HasMaxLength(120);
        builder.Property(r => r.HomeDepot)
            .IsRequired()
            .HasMaxLength(120);
        // Stored as text (e.g. "Boat") rather than an integer - see the
        // same pattern in IncidentConfiguration.
        builder.Property(r => r.Type)
            .HasConversion<String>()
            .HasMaxLength(30);
    }
}
