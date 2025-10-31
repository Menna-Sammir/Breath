using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
  public class CreateActivities
  {
    public class Command : IRequest<Guid>
    {
      public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Guid>
    {

      public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
      {
        context.Activities.Add(request.Activity);
        await context.SaveChangesAsync(cancellationToken);

        return request.Activity.Id;
      }
    }
  }
}
