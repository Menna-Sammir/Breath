using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler(AppDbContext context, ILogger<GetActivityList> logger, IMapper mapper)
            : IRequestHandler<Query, List<ActivityDto>>
        {
            public async Task<List<ActivityDto>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                logger.LogInformation("Fetching activity list");
                return await context
                    .Activities.ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
