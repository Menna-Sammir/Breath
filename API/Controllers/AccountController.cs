using System.Net.Http.Headers;
using System.Text;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using static API.DTOs.GithubInfo;

namespace API.Controllers;

public class AccountController(
    SignInManager<User> signInManager,
    IEmailSender<User> emailSender,
    IConfiguration config
) : BaseAPIController
{
    [AllowAnonymous]
    [HttpPost("github-login")]
    public async Task<ActionResult> LoginWithGitHub(string code)
    {
        if (string.IsNullOrEmpty(code))
        {
            return BadRequest("GitHub code is required.");
        }
        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json")
        );
        var tokenResponse = await httpClient.PostAsJsonAsync(
            "https://github.com/login/oauth/access_token",
            new GithubAuthRequest
            {
                Code = code,
                ClientId = config["Authentication:Github:GitHubClientId"]!,
                ClientSecret = config["Authentication:Github:GitHubClientSecret"]!,
                RedirectUri = $"{config["ClientAppUrl"]}/auth-callback",
            }
        );
        if (!tokenResponse.IsSuccessStatusCode)
        {
            return BadRequest("Error retrieving GitHub access token.");
        }
        var tokenContent = await tokenResponse.Content.ReadFromJsonAsync<GitHubTokenResponse>();
        if (tokenContent == null || string.IsNullOrEmpty(tokenContent?.AccessToken))
        {
            return BadRequest("Invalid GitHub access token response.");
        }

        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Bearer",
            tokenContent.AccessToken
        );
        httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("Breath"));

        var userResponse = await httpClient.GetAsync("https://api.github.com/user");
        if (!userResponse.IsSuccessStatusCode)
        {
            return BadRequest("Error retrieving GitHub user information.");
        }

        var user = await userResponse.Content.ReadFromJsonAsync<GitHubUser>();
        if (string.IsNullOrEmpty(user?.Email))
        {
            var emailsResponse = await httpClient.GetAsync("https://api.github.com/user/emails");
            if (emailsResponse.IsSuccessStatusCode)
            {
                var emails = await emailsResponse.Content.ReadFromJsonAsync<List<GitHubEmail>>();
                var primary = emails?.FirstOrDefault(e => e.Primary && e.Verified)?.Email;
                if (string.IsNullOrEmpty(primary))
                {
                    return BadRequest("No verified primary email found for GitHub user.");
                }
                user!.Email = primary;
            }
        }

        var existingUser = await signInManager.UserManager.Users.FirstOrDefaultAsync(u =>
            u.Email == user!.Email
        );
        if (existingUser == null)
        {
            existingUser = new User
            {
                UserName = user!.Email,
                Email = user.Email,
                DisplayName = user.Name,
                ImageUrl = user.ImageUrl,
            };
            var createResult = await signInManager.UserManager.CreateAsync(existingUser);
            if (!createResult.Succeeded)
            {
                return BadRequest("Error creating user account.");
            }
            await signInManager.SignInAsync(existingUser, isPersistent: false);
        }

        return Ok();
    }

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

    [HttpPost("change-password")]
    [ValidateAntiForgeryToken]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
    {
        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var result = await signInManager.UserManager.ChangePasswordAsync(
            user,
            changePasswordDto.CurrentPassword,
            changePasswordDto.NewPassword
        );

        if (result.Succeeded)
        {
            return Ok(new { message = "Password changed successfully." });
        }
        else
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("changePasswordError", error.Description);
            }
            return ValidationProblem();
        }
    }
}
