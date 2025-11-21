using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reviews.Commands
{
    public class DeleteReviews
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Guid Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var review = await context.Reviews.FindAsync(request.Id);

                if (review == null)
                    return Result<Unit>.Failure("Review not found", 404);

                context.Reviews.Remove(review);

                var result = await context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to delete activity", 400);
            }
        }
    }
}
