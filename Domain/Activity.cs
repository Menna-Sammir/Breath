using System;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    [Index(nameof(Date))]
    public class Activity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public required string Duration { get; set; }
        public decimal Price { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCancelled { get; set; }
        public required string City { get; set; }
        public required string Venue { get; set; }
        public string? DeparturePlace { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? EventPhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; } = [];

        public ICollection<ActivityAttendee> Attendees { get; set; } = [];

        public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<Review> Reviews { get; set; } = [];
    }
}
