using System.Net.Mail;
using MailKit.Security;
using MimeKit;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace WetSeasonBackend.Api.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger) : IEmailService
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
        
        // Skips only the certificate *revocation* check (hostname/expiry/chain still
        // checked) - some networks block the OCSP lookup, which .NET treats as fatal.
        smtp.CheckCertificateRevocation = false;

        // Connect using STARTTLS or SSL/TLS depending on your port (587 usually uses StartTls)
        logger.LogInformation("Connecting to SMTP server {Server}:{Port}.", server, port);
        await smtp.ConnectAsync(server, port, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(username, password);

        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
        logger.LogInformation("Sent email to {Recipient} with subject {Subject}.", to, subject);
    }
}