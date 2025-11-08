using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseAPIController
{
    [HttpPost("add-photo")]
    public async Task<ActionResult> AddPhoto([FromForm] IFormFile file)
    {
        var photoId = await Mediator.Send(new AddPhoto.Command { File = file });
        return HandlerResult(photoId);
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
    {
        var result = await Mediator.Send(new GetProfilePhotos.Query { UserId = userId });
        return HandlerResult(result);
    }

    [HttpDelete("{photoId}/photo")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
        var result = await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId });
        return HandlerResult(result);
    }

    [HttpPut("{photoId}/setMain")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
        var result = await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId });
        return HandlerResult(result);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        var result = await Mediator.Send(new GetProfile.Query { UserId = userId });
        return HandlerResult(result);
    }

    [HttpGet("{userId}/activities")]
    public async Task<IActionResult> GetUserActivities(string userId, string filter)
    {
        return HandlerResult(
            await Mediator.Send(new GetUserActivities.Query { UserId = userId, Filter = filter })
        );
    }

    [HttpPut]
    public async Task<ActionResult> UpdateProfile(EditProfile.Command command)
    {
        return HandlerResult(await Mediator.Send(command));
    }
}
