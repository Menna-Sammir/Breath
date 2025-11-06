using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivities
    {
        public class Command : IRequest<Result<Guid>>
        {
            public required CreateActivityDto ActivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
            : IRequestHandler<Command, Result<Guid>>
        {
            public async Task<Result<Guid>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var user = await userAccessor.GetUserAsync();

                // remove this for behavior injection at middleware level
                // await validator.ValidateAndThrowAsync(request, cancellationToken);
                var activity = mapper.Map<Activity>(request.ActivityDto);
                context.Activities.Add(activity);

                var attendee = new ActivityAttendee
                {
                    UserId = user.Id,
                    Activity = activity,
                    IsHost = true,
                };
                activity.Attendees.Add(attendee);

                var result = await context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                    return Result<Guid>.Success(activity.Id);

                return Result<Guid>.Failure("Failed to create activity", 400);
            }
        }
    }
}
