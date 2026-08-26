using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WetSeasonBackend.Api.Data.Configurations;

public class CommunityConfiguration : IEntityTypeConfiguration<Community>
{
    public void Configure(EntityTypeBuilder<Community> builder)
    {
        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(120);
        builder.Property(c => c.Region)
            .IsRequired()
            .HasMaxLength(60);
        builder.Property(c => c.ContactEmail)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.HasIndex(c => c.Name)
            .IsUnique();
    }
}