using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Primary Constructor Syntax
    public class ActivitiesController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var getActivities = await Mediator.Send(new GetActivityList.Query());
            return getActivities;
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
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            var deletedId = await Mediator.Send(new DeleteActivities.Command { Id = id });
            return HandlerResult(deletedId);
        }
    }
}
