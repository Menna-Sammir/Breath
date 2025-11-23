using Application.Activities.DTOs;
using Application.Core;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = context
                .Activities.OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x =>
                        x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())
                    ),
                    "isHost" => query.Where(x =>
                        x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())
                    ),
                    _ => query,
                };
            }

            // Additional filters: city, date, category, departure place, title
            if (!string.IsNullOrEmpty(request.Params.city))
            {
                Console.WriteLine("Filtering by city:", request.Params.city);
                query = query.Where(x => x.City.ToLower() == request.Params.city.ToLower());
                Console.WriteLine("Applied city filter.", query.ToQueryString());
            }

            if (request.Params.Date.HasValue)
            {
                var d = request.Params.Date.Value.Date;
                var nextDay = d.AddDays(1);
                query = query.Where(x => x.Date >= d && x.Date < nextDay);
            }

            if (!string.IsNullOrEmpty(request.Params.Category))
            {
                query = query.Where(x => x.Category == request.Params.Category);
            }

            // Price range filters
            if (request.Params.MinPrice.HasValue)
            {
                query = query.Where(x => x.Price >= request.Params.MinPrice.Value);
            }

            if (request.Params.MaxPrice.HasValue)
            {
                query = query.Where(x => x.Price <= request.Params.MaxPrice.Value);
            }

            if (!string.IsNullOrEmpty(request.Params.Duration))
            {
                switch (request.Params.Duration)
                {
                    case "1-3 Days":
                        query = query.Where(x => x.Duration >= 1 && x.Duration <= 3);
                        break;
                    case "3-5 Days":
                        query = query.Where(x => x.Duration > 3 && x.Duration <= 5);
                        break;
                    case "5+ Days":
                        query = query.Where(x => x.Duration > 5);
                        break;
                }
            }

            if (!string.IsNullOrEmpty(request.Params.DeparturePlace))
            {
                query = query.Where(x =>
                    x.DeparturePlace != null
                    && x.DeparturePlace.Contains(request.Params.DeparturePlace)
                );
            }

            if (!string.IsNullOrEmpty(request.Params.Title))
            {
                query = query.Where(x => x.Title.Contains(request.Params.Title));
            }

            var projectedActivities = query.ProjectTo<ActivityDto>(
                mapper.ConfigurationProvider,
                new { currentUserId = userAccessor.GetUserId() }
            );

            var activities = await projectedActivities
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityDto, DateTime?>>.Success(
                new PagedList<ActivityDto, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor,
                }
            );
        }
    }
}
