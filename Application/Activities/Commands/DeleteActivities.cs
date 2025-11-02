using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
  public class DeleteActivities
  {
    public class Command : IRequest<Result<Unit>>
    {
      public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await context.Activities.FindAsync(request.Id);

        if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

        context.Activities.Remove(activity);

       var result = await context.SaveChangesAsync(cancellationToken);

       if (result > 0) return Result<Unit>.Success(Unit.Value);

       return Result<Unit>.Failure("Failed to delete activity", 400);
      }
  } }
}
