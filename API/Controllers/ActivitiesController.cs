using System;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities.Queries;
using MediatR;

namespace API.Controllers
{
	// Primary Constructor Syntax
	public class ActivitiesController : BaseAPIController
	{
		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			var getActivites = await Mediator.Send(new GetActivityList.Query());
			return CustomResponse(getActivites);

		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Activity>> GetActivity(Guid id)
		{
			var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id });
			return CustomResponse(activity);
		}

		[HttpPost]
		public async Task<ActionResult<Guid>> CreateActivity(Activity activity)
		{
			var id = await Mediator.Send(new Application.Activities.Commands.CreateActivities.Command { Activity = activity });
			return CustomResponse(id);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<Guid>> EditActivity([FromRoute] Guid id, [FromBody] Activity activity)
		{
			activity.Id = id;
			var updatedId = await Mediator.Send(new Application.Activities.Commands.EditActivity.Command { Activity = activity });
			return CustomResponse(updatedId);
		}
	

		[HttpDelete("{id}")]
		public async Task<ActionResult<Guid>> DeleteActivity(Guid id)
		{
			var deletedId = await Mediator.Send(new Application.Activities.Commands.DeleteActivities.Command { Id = id });
			return CustomResponse(deletedId);
		}
	}
}