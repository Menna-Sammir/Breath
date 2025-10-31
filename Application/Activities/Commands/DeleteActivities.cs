using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
  public class DeleteActivities
  {
    public class Command : IRequest<Guid>
    {
      public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Guid>
    {

      public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await context.Activities.FindAsync(request.Id)?? throw new Exception("Activity not found");

        context.Activities.Remove(activity);
        await context.SaveChangesAsync(cancellationToken);

        return activity.Id;
      }
  } }
}
