using Application.Core;
using Application.Reviews.Commands;
using Application.Reviews.DTOs;
using Application.Reviews.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ReviewsController : BaseAPIController
{
    [HttpGet("{activityId}/reviews")]
    public async Task<ActionResult<PagedList<ReviewsDto, DateTime?>>> GetReviews(
        Guid activityId,
        [FromQuery] PaginationParams<DateTime?> paginationParams
    )
    {
        return HandlerResult(
            await Mediator.Send(
                new GetReviewsList.Query { Params = paginationParams, ActivityId = activityId }
            )
        );
    }

    [HttpPost]
    public async Task<ActionResult<ReviewsDto>> CreateReview([FromBody] CreateReviewDto ReviewDto)
    {
        var id = await Mediator.Send(
            new CreateReviews.Command
            {
                Body = ReviewDto.Body,
                Rating = ReviewDto.Rating,
                ActivityId = ReviewDto.ActivityId,
            }
        );
        return HandlerResult(id);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ReviewsDto>> UpdateReview(Guid id, EditReviewDto reviewDto)
    {
        return HandlerResult(await Mediator.Send(new EditReview.Command { ReviewDto = reviewDto }));
    }

    [HttpGet("{id}/summary")]
    public async Task<ActionResult<ReviewsSummaryDto>> GetReviewsSummary(string id)
    {
        Console.WriteLine($"Received request for review summary of ActivityId: {id}");
        return HandlerResult(
            await Mediator.Send(new GetReviewsSummery.Query { ActivityId = Guid.Parse(id) })
        );
    }
}
