using System.Text;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(
    SignInManager<User> signInManager,
    IEmailSender<User> emailSender,
    IConfiguration config
) : BaseAPIController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            await SendConfirmationEmailAsync(user, registerDto.Email);
            return Ok();
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError("registerError", error.Description);
        }
        return ValidationProblem();
    }

    [AllowAnonymous]
    [HttpGet("resendConfirmEmail")]
    public async Task<ActionResult> ResendConfirmEmail(string? email, string? userId)
    {
        if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(userId))
        {
            return BadRequest("Email or UserId must be provided");
        }

        var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(x =>
            x.Email == email || x.Id == userId
        );

        if (user == null || string.IsNullOrEmpty(user.Email))
            return BadRequest("User not found");

        Console.WriteLine("Resending confirmation email to user: " + user.Email);

        await SendConfirmationEmailAsync(user, user.Email);

        return Ok();
    }

    private async Task SendConfirmationEmailAsync(User user, string email)
    {

        var code = await signInManager.UserManager.GenerateEmailConfirmationTokenAsync(user);
        code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
        var confirmationLink =
            $"{config["ClientAppUrl"]}/confirm-email?userId={user.Id}&code={code}";
        Console.WriteLine("Confirmation Link: " + confirmationLink); // For debugging purposes

        if (confirmationLink != null)
        {
            await emailSender.SendConfirmationLinkAsync(user, email, confirmationLink);
        }
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        Console.WriteLine("GetUserInfo called");

        if (User?.Identity == null || !User.Identity.IsAuthenticated)
            return NoContent();
        Console.WriteLine("User is authenticated");
        var user = await signInManager.UserManager.GetUserAsync(User);
        Console.WriteLine("Retrieved user: " + (user != null ? user.Email : "null"));
        if (user == null)
            return Unauthorized();

        return Ok(
            new
            {
                user.Email,
                user.DisplayName,
                user.Id,
                user.ImageUrl,
            }
        );
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }
}
