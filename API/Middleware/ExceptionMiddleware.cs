using Application.Core;
using FluentValidation;




namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
  public async Task InvokeAsync(HttpContext context, RequestDelegate next)
  {
    try
    {
      await next(context);
    }
    catch (ValidationException ex)
    {
      await HandleValidationExceptionAsync(context, ex);
    }

    catch (Exception ex)
    {
      await HandleException(context, ex);
    }
  }

  private async Task HandleException(HttpContext context, Exception ex)
  {
    logger.LogError(ex, ex.Message);
    context.Response.ContentType = "application/json";
    context.Response.StatusCode = StatusCodes.Status500InternalServerError;

    var response = env.IsDevelopment()
      ? new AppException
      (
        message: ex.Message,
        statusCode: context.Response.StatusCode,
        details: ex.StackTrace
      )
      : new AppException
      (
        message: "Internal Server Error",
        statusCode: context.Response.StatusCode,
        details: null
      );

    var options = new System.Text.Json.JsonSerializerOptions { PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase };

    var json = System.Text.Json.JsonSerializer.Serialize(response, options);

    await context.Response.WriteAsJsonAsync(json);
  }

  private static async Task HandleValidationExceptionAsync(HttpContext context, ValidationException ex)
  {
    var validationErrors = new Dictionary<string, string[]>();

    if (ex.Errors is not null)
    {
      foreach (var entry in ex.Errors)
      {
        if (validationErrors.TryGetValue(entry.PropertyName, out var errors))
        {
          validationErrors[entry.PropertyName] = errors.Append(entry.ErrorMessage).ToArray();
        }
        else
        {
          validationErrors[entry.PropertyName] = new[] { entry.ErrorMessage };
        }

      }
    }


    context.Response.StatusCode = StatusCodes.Status400BadRequest;
    var validationProblemDetails = new Microsoft.AspNetCore.Mvc.ValidationProblemDetails(validationErrors)
    {
      Status = StatusCodes.Status400BadRequest,
      Type = "ValidationFailed",
      Title = "One or more validation errors occurred.",
      Detail = "See the errors property for details.",
      Instance = context.Request.Path
    };
    await context.Response.WriteAsJsonAsync(validationProblemDetails);
  }
}