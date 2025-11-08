using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
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
            DateTime? cursor,
            int pageSize = 3
        )
        {
            var getActivities = await Mediator.Send(
                new GetActivityList.Query { Cursor = cursor, PageSize = pageSize }
            );
            return HandlerResult(getActivities);
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
    }
}
