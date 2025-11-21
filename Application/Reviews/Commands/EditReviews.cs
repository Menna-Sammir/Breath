using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Reviews.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reviews.Commands
{
    public class EditReview
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditReviewDto ReviewDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper)
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var existingReview = await context.Reviews.FindAsync(
                    request.ReviewDto.Id,
                    cancellationToken
                );
                if (existingReview == null)
                    return Result<Unit>.Failure("Review not found", 404);
                mapper.Map(request.ReviewDto, existingReview);
                // context.Reviews.Update(existingReview);

                var result = await context.SaveChangesAsync(cancellationToken);

                if (result > 0)
                    return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to delete activity", 400);
            }
        }
    }
}
