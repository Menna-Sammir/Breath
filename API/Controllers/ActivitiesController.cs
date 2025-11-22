using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Application.Profiles.Commands;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Primary Constructor Syntax
    public class ActivitiesController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities(
            [FromQuery] ActivityParams activityParams
        )
        {
            return HandlerResult(
                await Mediator.Send(new GetActivityList.Query { Params = activityParams })
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });

            return HandlerResult(activity);
        }

        [HttpPost]
        public async Task<ActionResult> CreateActivity(CreateActivityDto ActivityDto)
        {
            var id = await Mediator.Send(
                new CreateActivities.Command { ActivityDto = ActivityDto }
            );
            return HandlerResult(id);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> EditActivity(
            [FromRoute] Guid id,
            [FromBody] EditActivityDto activity
        )
        {
            Console.WriteLine("ActivitiesController EditActivity called");
            activity.Id = id;
            var updatedId = await Mediator.Send(
                new EditActivity.Command { ActivityDto = activity }
            );
            return HandlerResult(updatedId);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            var deletedId = await Mediator.Send(new DeleteActivities.Command { Id = id });
            return HandlerResult(deletedId);
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult> Attend(string id)
        {
            return HandlerResult(
                await Mediator.Send(new UpdateAttendance.Command { Id = Guid.Parse(id) })
            );
        }

        [HttpPost("{id}/add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(string id, IFormFile file)
        {
            return HandlerResult(
                await Mediator.Send(
                    new AddPhoto.Command { File = file, ActivityId = Guid.Parse(id) }
                )
            );
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhotosForActivity(
            [FromRoute(Name = "id")] string ActivityId
        )
        {
            Console.WriteLine("GetPhotosForActivity called with ActivityId: " + ActivityId);
            return HandlerResult(
                await Mediator.Send(
                    new GetActivityPhotos.Query { ActivityId = Guid.Parse(ActivityId) }
                )
            );
        }

        [HttpPut("{activityId}/set-photo/{id}")]
        public async Task<ActionResult> SetEventPhoto(
            string id,
            [FromRoute(Name = "activityId")] string activityId
        )
        {
            Console.WriteLine(
                $"SetEventPhoto called with PhotoId: {id} and ActivityId: {activityId}"
            );
            return HandlerResult(
                await Mediator.Send(
                    new SetEventPhoto.Command { PhotoId = id, ActivityId = Guid.Parse(activityId) }
                )
            );
        }
    }
}
