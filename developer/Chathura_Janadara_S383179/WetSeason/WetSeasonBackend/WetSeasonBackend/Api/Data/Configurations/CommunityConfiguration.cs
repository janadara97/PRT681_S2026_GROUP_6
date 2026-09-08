using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WetSeasonBackend.Api.Data.Configurations;

// "Fluent API" config for the Community entity - column constraints that
// don't belong on the model class itself, similar to a JPA @Column or a
// Laravel migration's ->string('name', 120).
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

        // Enforces no two communities share a name, at the DB level.
        builder.HasIndex(c => c.Name)
            .IsUnique();
    }
}
