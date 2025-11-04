using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
        private IMediator? _mediator;
        protected IMediator Mediator =>
            _mediator ??=
                HttpContext?.RequestServices?.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is not available.");

        protected ActionResult HandlerResult<T>(Result<T> result)
        {
            if (result == null || (!result.IsSuccess && result.StatusCode == 404))
            {
                return NotFound();
            }

            if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }

            return BadRequest(result.Error);
        }
    }
}
