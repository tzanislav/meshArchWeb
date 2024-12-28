const { SMTPServer } = require('smtp-server');
const nodemailer = require('nodemailer');

const smtpServer = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        console.log('New email received');
        let emailData = '';
        stream.on('data', (chunk) => {
            emailData += chunk;
        });
        stream.on('end', async () => {
            try {
                // Relay email directly
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com', // Replace with your relay server if needed
                    port: 587,
                    secure: false,
                });

                await transporter.sendMail({
                    from: session.envelope.mailFrom.address,
                    to: 'tzanislav@gmail.com',
                    raw: emailData, // Send the original content
                });

                callback();
            } catch (error) {
                callback(error);
            }
        });
    },
});

smtpServer.listen(2525, () => {
    console.log('SMTP server running on port 2525');
});
