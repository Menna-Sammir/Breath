using Application.interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> configuration)
    {
        _cloudinary = new Cloudinary(
            new Account(
                configuration.Value.CloudName,
                configuration.Value.ApiKey,
                configuration.Value.ApiSecret
            )
        );
    }

    public async Task<PhotoUploadResult?> UploadPhotoAsync(IFormFile file)
    {
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                // Transformation = new Transformation().Crop("fill").Width(500).Height(500),
                Folder = "user_photos",
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
            {
                throw new Exception(result.Error.Message);
            }
            return new PhotoUploadResult
            {
                PublicId = result.PublicId,
                Url = result?.SecureUrl?.AbsoluteUri!,
            };
        }
        return null!;
    }

    public async Task<string> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        if (result.Error != null)
        {
            throw new Exception(result.Error.Message);
        }
        return result.Result;
    }
}
