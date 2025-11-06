using System.Security.Claims;
using Application.interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext)
    : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId())
            ?? throw new Exception("User not found");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!
            ?? throw new Exception("User not found");
    }
}
