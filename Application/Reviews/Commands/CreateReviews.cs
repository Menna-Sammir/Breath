using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.interfaces;
using Application.Reviews.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Commands
{
    public class CreateReviews
    {
        public class Command : IRequest<Result<ReviewsDto>>
        {
            public required string Body { get; set; }

            public required int Rating { get; set; }
            public required Guid ActivityId { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
            : IRequestHandler<Command, Result<ReviewsDto>>
        {
            public async Task<Result<ReviewsDto>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var activity = await context.Activities.FindAsync(
                    request.ActivityId,
                    cancellationToken
                );

                Console.WriteLine("activity getting from reviews", activity);

                if (activity == null)
                    return Result<ReviewsDto>.Failure("Could not find activity", 404);

                var user = await userAccessor.GetUserAsync();
                if (user == null)
                    return Result<ReviewsDto>.Failure("Could not find user", 404);
                Console.WriteLine("user getting from reviews", user);

                var review = new Review
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    Rating = request.Rating,
                    Body = request.Body,
                };

                activity.Reviews.Add(review);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                Console.WriteLine("result", result);

                return result
                    ? Result<ReviewsDto>.Success(mapper.Map<ReviewsDto>(review))
                    : Result<ReviewsDto>.Failure("Failed to add review", 400);
            }
        }
    }
}
