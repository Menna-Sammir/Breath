using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using AutoMapper;


namespace Application.Activities.Commands
{
  public class EditActivity
  {
    public class Command : IRequest<Guid>
    {
      public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Guid>
    {
      public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
      {
        var existingActivity = await context.Activities.FindAsync(request.Activity.Id, cancellationToken) ?? throw new Exception("Could not find activity");
        mapper.Map(request.Activity, existingActivity);
        // context.Activities.Update(existingActivity);
        await context.SaveChangesAsync(cancellationToken);

        return existingActivity.Id;
      }
    }
  }
}