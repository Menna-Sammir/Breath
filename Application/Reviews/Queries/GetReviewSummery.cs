using System;
using System.Collections.Generic;
using Application.Core;
using Application.interfaces;
using Application.Reviews.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Queries;

public class GetReviewsSummery
{
    public class Query : IRequest<Result<ReviewsSummaryDto>>
    {
        public required Guid ActivityId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<ReviewsSummaryDto>>
    {
        public async Task<Result<ReviewsSummaryDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = context
                .Reviews.Where(r => r.ActivityId == request.ActivityId)
                .AsQueryable();

            var totalReviews = await query.CountAsync(cancellationToken);

            double averageRating = 0.0;
            if (totalReviews > 0)
            {
                averageRating = await query.AverageAsync(r => r.Rating, cancellationToken);
            }

            var distribution = new List<RatingSummaryDto>();
            for (int rating = 5; rating >= 1; rating--)
            {
                var count = await query.CountAsync(r => r.Rating == rating, cancellationToken);
                var percentage = totalReviews > 0 ? (count * 100.0) / totalReviews : 0.0;
                distribution.Add(
                    new RatingSummaryDto
                    {
                        Rating = rating,
                        Count = count,
                        Percentage = Math.Round(percentage, 2),
                    }
                );
            }

            var summary = new ReviewsSummaryDto
            {
                AverageRating = Math.Round(averageRating, 2),
                TotalReviews = totalReviews,
                RatingDistribution = distribution,
            };

            return Result<ReviewsSummaryDto>.Success(summary);
        }
    }
}
