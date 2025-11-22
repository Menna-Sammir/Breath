using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityPhotos
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required Guid ActivityId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var photos = await context
                .Activities.Where(x => x.Id == request.ActivityId)
                .SelectMany(x => x.Photos)
                .ToListAsync(cancellationToken);

            return Result<List<Photo>>.Success(photos);
        }
    }
}
