using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities.Include(a => a.Attendees)
                .ThenInclude(ua => ua.User)
                .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

            if (activity == null)
                return Result<Unit>.Failure("Activity not found", 404);

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(a => a.User.Id == user.Id);

            var isHost = activity.Attendees.Any(a => a.User.Id == user.Id && a.IsHost);

            if (attendance != null)
            {
                if (isHost)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                {
                    activity.Attendees.Remove(attendance);
                }
            }
            else
            {
                activity.Attendees.Add(
                    new ActivityAttendee
                    {
                        UserId = user.Id,
                        ActivityId = activity.Id,
                        IsHost = false,
                    }
                );
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to update attendance", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
