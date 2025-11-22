using Application.Core;
using Application.interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class SetEventPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
        public required Guid ActivityId { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities.Include(a => a.Photos)
                .FirstOrDefaultAsync(a => a.Id == request.ActivityId, cancellationToken);

            if (activity == null)
                return Result<Unit>.Failure("Activity not found", 400);

            var photo = activity.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

            if (photo == null)
                return Result<Unit>.Failure("Photo not found", 404);

            if (activity.EventPhotoUrl == photo.Url)
                return Result<Unit>.Success(Unit.Value);

            activity.EventPhotoUrl = photo.Url;
            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (success)
                return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem setting main photo", 500);
        }
    }
}
