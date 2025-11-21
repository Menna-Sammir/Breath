using System.Collections.Generic;

namespace Application.Reviews.DTOs;

public class ReviewsSummaryDto
{
    public double AverageRating { get; set; }
    public int TotalReviews { get; set; }
    public List<RatingSummaryDto> RatingDistribution { get; set; } = new List<RatingSummaryDto>();
}
