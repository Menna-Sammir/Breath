using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        // Return the Activity payload on success so the controller can return the entity
        public class Query : IRequest<Result<ActivityDto>>
        {
            public required Guid Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper)
            : IRequestHandler<Query, Result<ActivityDto>>
        {
            public async Task<Result<ActivityDto>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                // Use FirstOrDefaultAsync with the cancellation token for compatibility
                var activity = await context
                    .Activities.ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(a => request.Id == a.Id, cancellationToken);

                if (activity == null)
                    return Result<ActivityDto>.Failure("Activity not found", 404);

                return Result<ActivityDto>.Success(activity);
            }
        }
    }
}
