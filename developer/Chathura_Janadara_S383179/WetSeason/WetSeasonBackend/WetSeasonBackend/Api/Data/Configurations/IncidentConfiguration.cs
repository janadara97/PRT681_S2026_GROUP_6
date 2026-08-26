using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data.Configurations;

public class IncidentConfiguration : IEntityTypeConfiguration<Incident>
{
    public void Configure(EntityTypeBuilder<Incident> builder)
    {
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
        builder.HasOne(i => i.Community)
            .WithMany(i => i.Incidents)
            .HasForeignKey(i => i.CommunityId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}