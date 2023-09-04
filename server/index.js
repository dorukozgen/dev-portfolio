const express = require('express');
const { rateLimit } = require('express-rate-limit');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
    }
});

const contactLimiter = rateLimit({
    windoıwsMs: 30 * 1000,
    max: 5,
    statusCode: 429,
    message: {
        success: false,
        message: 'Çok fazla istek gönderdiniz. Lütfen 30 saniye sonra tekrar deneyiniz.'
    }
});

app.post('/api/contact', contactLimiter, (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.SMTP_AUTH_USER,
        to: process.env.SMTP_AUTH_USER,
        subject: subject,
        text: `${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res
                .status(500)
                .send({
                    success: false,
                    message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
                });
        }

        console.log('Email sent: ' + info.response);
        return res.status(200).send({
            success: true,
            message: 'Benimle iletişime geçtiğiniz için teşekkürler. En yakın zamanda sizlere dönüş yapacağım.'
        });
    })
});

const PORT = process.env.PORT;
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server is running on port ' + PORT));