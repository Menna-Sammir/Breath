using Domain;
using Microsoft.AspNetCore.Identity;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend) : IEmailSender<User>
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
        throw new NotImplementedException();
        // await SendEmailAsync(email, "Reset your password", resetLink);
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
