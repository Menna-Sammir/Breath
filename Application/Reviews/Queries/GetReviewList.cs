using Application.Core;
using Application.interfaces;
using Application.Reviews.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Queries;

public class GetReviewsList
{
    public class Query : IRequest<Result<PagedList<ReviewsDto, DateTime?>>>
    {
        public required Guid ActivityId { get; set; }
        public required PaginationParams<DateTime?> Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ReviewsDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ReviewsDto, DateTime?>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = context
                .Reviews.Where(r => r.ActivityId == request.ActivityId)
                .Include(r => r.User)
                .AsQueryable();

            if (request.Params.Cursor is not null)
            {
                query = query.Where(x => x.CreatedAt < request.Params.Cursor.Value);
            }

            query = query.OrderByDescending(x => x.CreatedAt);

            var projectedReviews = query.ProjectTo<ReviewsDto>(
                mapper.ConfigurationProvider,
                new { currentUserId = userAccessor.GetUserId() }
            );

            var reviews  = await projectedReviews
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (reviews.Count > request.Params.PageSize)
            {
                nextCursor = reviews.Last().CreatedAt;
                reviews.RemoveAt(reviews.Count - 1);
            }

            return Result<PagedList<ReviewsDto, DateTime?>>.Success(
                new PagedList<ReviewsDto, DateTime?> { Items = reviews, NextCursor = nextCursor }
            );
        }
    }
}
