using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Http;

namespace Application.interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResult?> UploadPhotoAsync(IFormFile file);
    Task<string> DeletePhotoAsync(string publicId);
}
