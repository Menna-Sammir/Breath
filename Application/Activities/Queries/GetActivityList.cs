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
        // try
        // {
        //   for (var i = 0; i < 10; i++)
        //   {
        //     cancellationToken.ThrowIfCancellationRequested();
        //     await Task.Delay(1000, cancellationToken);
        //     logger.LogInformation($"Task {i} - Delay {1000}ms");
        //   }

        // }
        // catch (Exception ex)
        // {
        //   logger.LogError(ex, "Task was cancelled");
        // }
        return await context.Activities.ToListAsync(cancellationToken);
      }
    }
  }
}