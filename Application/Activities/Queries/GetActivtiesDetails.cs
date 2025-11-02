using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
  public class GetActivityDetails
  {
    public class Query : IRequest<Result<Unit>>
    {
      public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Unit>>
    {

      public async Task<Result<Unit>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activity = await context.Activities.FindAsync(request?.Id, cancellationToken);

        if (activity == null)  return Result<Unit>.Failure("Activity not found", 404);

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}