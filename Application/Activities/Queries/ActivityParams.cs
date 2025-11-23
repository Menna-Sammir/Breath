using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime? StartDate { get; set; } = DateTime.UtcNow;
    public string? city { get; set; }
    public DateTime? Date { get; set; }
    public string? Category { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? DeparturePlace { get; set; }
    public string? Title { get; set; }
    public string? Duration { get; set; }
}
