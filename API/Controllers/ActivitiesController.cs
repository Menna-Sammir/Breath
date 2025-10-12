using System;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	// Primary Constructor Syntax
	public class ActivitiesController(AppDbContext context) : BaseAPIController
	{
		[HttpGet]
		public async Task<ActionResult<List<Activity>>> GetActivities()
		{
			var getActivites = await context.Activities.ToListAsync();
			return CustomResponse(getActivites);

		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Activity>> GetActivity(Guid id)
		{
			var activity = await context.Activities.FindAsync(id);
			if (activity == null) return NotFound();
			return CustomResponse(activity);
		}
	}
}