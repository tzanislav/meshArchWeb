const { SMTPServer } = require('smtp-server');
const nodemailer = require('nodemailer');

const smtpServer = new SMTPServer({
    authOptional: true,
    onRcptTo(address, session, callback) {
        console.log('Recipient:', address.address);
        if (address.address !== 'office@mesharch.studio') {
            return callback(new Error('Invalid recipient address'));
        }
        callback();
    },
    onData(stream, session, callback) {
        let emailData = '';
        stream.on('data', (chunk) => {
            emailData += chunk;
        });
        stream.on('end', async () => {
            try {
                // Forward the email to Gmail
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'your-gmail@gmail.com',
                        pass: 'your-gmail-app-password', // Use an App Password
                    },
                });

                await transporter.sendMail({
                    from: 'office@mesharch.studio',
                    to: 'tzanislav@gmail.com',
                    subject: 'Forwarded Email',
                    text: emailData, // Forward the full email body
                });

                console.log('Email forwarded to Gmail');
                callback();
            } catch (err) {
                console.error('Error forwarding email:', err);
                callback(err);
            }
        });
    },
});

smtpServer.listen(25, () => {
    console.log('SMTP server is running on port 25');
});
