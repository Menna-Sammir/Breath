using Application.Core;
using Application.interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(
        AppDbContext context,
        IUserAccessor userAccessor,
        IPhotoService photoService
    ) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            if (user == null)
                return Result<Unit>.Failure("User not found", 400);

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

            if (photo == null)
                return Result<Unit>.Failure("Photo not found", 404);

            if (photo.Url == user.ImageUrl)
                return Result<Unit>.Failure("You cannot delete your main photo", 400);

            var photoResult = await photoService.DeletePhotoAsync(photo.PublicId);

            user.Photos.Remove(photo);
            var success = await context.SaveChangesAsync(cancellationToken) > 0;

            if (success)
                return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem deleting photo from database", 500);
        }
    }
}
