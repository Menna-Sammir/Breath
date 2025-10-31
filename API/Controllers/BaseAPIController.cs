using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MediatR;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {

        private IMediator? _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext?.RequestServices?.GetService<IMediator>() ?? throw new InvalidOperationException("IMediator service is not available.");

        protected ActionResult CustomResponse(object result = null, string message = null, int statusCode = StatusCodes.Status200OK)
        {
            var response = new
            {
                Success = statusCode >= 200 && statusCode < 300,
                Message = message,
                Data = result
            };

            return StatusCode(statusCode, response);
        }
    }
}