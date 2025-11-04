using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
  public class GetActivityDetails
  {
    // Return the Activity payload on success so the controller can return the entity
    public class Query : IRequest<Result<Activity>>
    {
      public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
      public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
        // Use FirstOrDefaultAsync with the cancellation token for compatibility
        var activity = await context.Activities
          .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

        if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

        return Result<Activity>.Success(activity);
      }
    }
  }
}