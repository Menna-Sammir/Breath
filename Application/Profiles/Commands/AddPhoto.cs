using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
        public Guid? ActivityId { get; set; }
    }

    public class Handler(
        IUserAccessor userAccessor,
        AppDbContext context,
        IPhotoService photoService
    ) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var user = await userAccessor.GetUserAsync();
            var uploadResult = await photoService.UploadPhotoAsync(request.File);
            if (uploadResult == null)
                return Result<Photo>.Failure("Failed to add photo", 400);
            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id,
                ActivityId = request.ActivityId ?? Guid.Empty,
            };
            user.ImageUrl ??= photo.Url;

            context.Photos.Add(photo);

            var success = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!success)
                return Result<Photo>.Failure("Failed to save photo", 400);
            return Result<Photo>.Success(photo);
        }
    }
}
