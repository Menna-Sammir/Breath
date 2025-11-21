namespace Application.Reviews.DTOs;

public class ReviewsDto
{
    public required Guid Id { get; set; }
    public required string Body { get; set; }
    public required int Rating { get; set; }
    public DateTime CreatedAt { get; set; }

    public required string UserId { get; set; }
    public required string DisplayName { get; set; }
    public string? Image { get; set; }

    public string? AuthorName { get; set; }
    public string? AuthorImage { get; set; }
}
