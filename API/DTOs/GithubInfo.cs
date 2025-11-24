using System.Text.Json.Serialization;

namespace API.DTOs;

public class GithubInfo
{
    public class GithubAuthRequest
    {
        public required string Code { get; set; }

        [JsonPropertyName("client_id")]
        public required string ClientId { get; set; }

        [JsonPropertyName("client_secret")]
        public required string ClientSecret { get; set; }

        [JsonPropertyName("redirect_uri")]
        public required string RedirectUri { get; set; }
    }

    public class GitHubTokenResponse
    {
        [JsonPropertyName("access_token")]
        public required string AccessToken { get; set; }
    }

    public class GitHubUser
    {
        public required string Email { get; set; }

        public required string Name { get; set; }

        [JsonPropertyName("avatar_url")]
        public string? ImageUrl { get; set; }
    }

    public class GitHubEmail
    {
        public string Email { get; set; } = "";

        [JsonPropertyName("primary")]
        public required bool Primary { get; set; }

        [JsonPropertyName("verified")]
        public required bool Verified { get; set; }
    }
}
