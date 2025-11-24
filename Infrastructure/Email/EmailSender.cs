using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend, IConfiguration config) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var body = $@"Please confirm your email by clicking the following link: {confirmationLink}";
        await SendMailAsync(email, "Confirm your email", body);
    }

    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        throw new NotImplementedException();
        // await resend.SendMailAsync(email, "Reset your password", resetCode);
    }

    public async Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        var body =
            $@"Please reset your password by clicking the following link:<a href='{config["ClientAppUrl"]}/reset-password?email={email}&code={resetLink}'>Reset Password</a>";
        await SendMailAsync(email, "Reset your password", body);
    }

    private async Task SendMailAsync(string email, string subject, string body)
    {
        var message = new EmailMessage
        {
            From = "no-reply@example.com",
            Subject = subject,
            HtmlBody = body,
        };
        message.To.Add(email);
        await resend.EmailSendAsync(message);
    }
}
