namespace Domain;

public class Comment
{
    public Guid Id { get; set; }
    public required string Body { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public required string UserId { get; set; }
    public required Guid ActivityId { get; set; }

    public User User { get; set; } = null!;
    public Activity Activity { get; set; } = null!;
}
