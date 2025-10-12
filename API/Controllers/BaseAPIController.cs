using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
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