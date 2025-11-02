using System;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace Application.Activities.Queries
{
  public class GetActivityList
  {
    public class Query : IRequest<List<Activity>>
    {

    }
    public class Handler(AppDbContext context, ILogger<GetActivityList> logger) : IRequestHandler<Query, List<Activity>>
    {

      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
        logger.LogInformation("Fetching activity list");
        return await context.Activities.ToListAsync(cancellationToken);
      }
    }
  }
}