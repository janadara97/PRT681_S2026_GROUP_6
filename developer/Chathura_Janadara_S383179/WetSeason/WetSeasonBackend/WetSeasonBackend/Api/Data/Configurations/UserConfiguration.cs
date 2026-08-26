using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder.HasKey(u => u.Id);
    builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
    builder.Property(u => u.Username).IsRequired().HasMaxLength(50);
    builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
    builder.Property(u => u.PasswordHash).IsRequired();
    builder.Property(u => u.CreatedAt).IsRequired();
    builder.Property(u => u.UpdatedAt).IsRequired();
  }
}
