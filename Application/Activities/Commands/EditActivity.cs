using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditActivityDto ActivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper)
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var existingActivity = await context.Activities.FindAsync(
                    request.ActivityDto.Id,
                    cancellationToken
                );
                if (existingActivity == null)
                    return Result<Unit>.Failure("Activity not found", 404);

                mapper.Map(request.ActivityDto, existingActivity);
                // context.Activities.Update(existingActivity);

                var result = await context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to delete activity", 400);
            }
        }
    }
}
