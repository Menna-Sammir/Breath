using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUserId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await userAccessor.GetUserAsync();

            var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.TargetUserId);

            if (target == null)
                return Result<Unit>.Failure("Could not find user", 404);

            var following = await context.UserFollowings.FindAsync(observer.Id, target.Id);

            if (following == null)
            {
                context.UserFollowings.Add(
                    new UserFollowing { ObserverId = observer.Id, TargetId = target.Id }
                );
            }
            else
            {
                context.UserFollowings.Remove(following);
            }

            return await context.SaveChangesAsync() > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update following", 404);
        }
    }
}
