using System.Net.Mail;
using MailKit.Security;
using MimeKit;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace WetSeasonBackend.Api.Services;

public class EmailService(IConfiguration configuration) : IEmailService
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var email = new MimeMessage();
        
        //sender details
        var senderName = configuration["EmailSettings:SenderName"];
        var senderEmail = configuration["EmailSettings:SenderEmail"];
        email.From.Add(new MailboxAddress(senderName, senderEmail));
        
        //recipient details
        email.To.Add(MailboxAddress.Parse(to));
        
        //subject and body
        email.Subject = subject;
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

        var smtp = new SmtpClient();
        
        var server = configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(configuration["EmailSettings:Port"]);
        var username = configuration["EmailSettings:Username"];
        var password = configuration["EmailSettings:Password"];
        
        // Skips the certificate *revocation* check specifically (not the
        // rest of certificate validation - hostname/expiry/chain are still
        // checked). Some networks block the OCSP revocation lookup itself,
        // which .NET otherwise treats as a hard failure.
        smtp.CheckCertificateRevocation = false;

        // Connect using STARTTLS or SSL/TLS depending on your port (587 usually uses StartTls)
        await smtp.ConnectAsync(server, port, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(username, password);
        
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }
}