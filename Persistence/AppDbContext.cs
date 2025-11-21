using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Activity> Activities { get; set; }
        public required DbSet<Review> Reviews { get; set; }
        public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public required DbSet<Photo> Photos { get; set; }
        public required DbSet<Comment> Comments { get; set; }
        public required DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x =>
            {
                x.HasKey(aa => new { aa.UserId, aa.ActivityId });

                x.HasOne(aa => aa.User).WithMany(u => u.Activities).HasForeignKey(aa => aa.UserId);

                x.HasOne(aa => aa.Activity)
                    .WithMany(a => a.Attendees)
                    .HasForeignKey(aa => aa.ActivityId);
            });
            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(uf => new { uf.ObserverId, uf.TargetId });

                b.HasOne(uf => uf.Observer)
                    .WithMany(u => u.Followings)
                    .HasForeignKey(uf => uf.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(uf => uf.Target)
                    .WithMany(u => u.Followers)
                    .HasForeignKey(uf => uf.TargetId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
            );

            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (
                        property.ClrType == typeof(DateTime)
                        || property.ClrType == typeof(DateTime?)
                    )
                    {
                        property.SetValueConverter(dateTimeConverter);
                    }
                }
            }
        }
    }
}
