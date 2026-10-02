require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* =========================================================
   NODEMAILER SMTP
========================================================= */

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'true',

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

/* =========================================================
   VERIFY EMAIL CONFIGURATION
========================================================= */

transporter.verify((error, success) => {
    if (error) {
        console.error(
            'SMTP connection failed:',
            error.message
        );
    } else {
        console.log(
            'SMTP server is ready to send emails.'
        );
    }
});

/* =========================================================
   BACKEND HEALTH CHECK
========================================================= */

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'NLETA Backend is running'
    });
});

/* =========================================================
   OTP SYSTEM
========================================================= */

let pendingOtp = null;
let otpExpiry = null;

/* =========================================================
   SEND OTP
========================================================= */

app.post('/api/send-otp', (req, res) => {

    const otp = Math.floor(
        100000 + Math.random() * 900000
    );

    pendingOtp = otp;

    otpExpiry =
        Date.now() +
        5 * 60 * 1000;

    const apiKey =
        process.env.FAST2SMS_API_KEY;

    const phoneNumber =
        process.env.FAST2SMS_PHONE_NUMBER ||
        '9211693664';

    if (!apiKey) {
        return res.status(500).json({
            success: false,
            message:
                'Missing FAST2SMS_API_KEY in environment'
        });
    }

    const message = encodeURIComponent(
        `Your NLETA deletion OTP is: ${otp}. Valid for 5 minutes.`
    );

    const url =
        `https://www.fast2sms.com/dev/bulkV2` +
        `?authorization=${apiKey}` +
        `&route=q` +
        `&message=${message}` +
        `&language=english` +
        `&flash=0` +
        `&numbers=${phoneNumber}`;

    https
        .get(url, (resp) => {

            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {

                try {

                    const result =
                        JSON.parse(data);

                    if (result.return) {

                        res.json({
                            success: true,
                            message:
                                'OTP sent to registered number.'
                        });

                    } else {

                        res.json({
                            success: false,
                            message:
                                'Failed to send OTP: ' +
                                (
                                    result.message ||
                                    JSON.stringify(result)
                                )
                        });
                    }

                } catch (error) {

                    console.error(
                        'OTP response parsing error:',
                        error
                    );

                    res.status(500).json({
                        success: false,
                        message:
                            'Invalid response from SMS service.'
                    });
                }
            });

        })
        .on('error', (error) => {

            console.error(
                'FAST2SMS network error:',
                error
            );

            res.status(500).json({
                success: false,
                message:
                    'Network error while sending OTP.'
            });
        });
});

/* =========================================================
   VERIFY OTP
========================================================= */

app.post('/api/verify-otp', (req, res) => {

    const { otp } = req.body;

    if (!pendingOtp) {

        return res.json({
            success: false,
            message:
                'No OTP sent. Click Send OTP first.'
        });
    }

    if (Date.now() > otpExpiry) {

        pendingOtp = null;
        otpExpiry = null;

        return res.json({
            success: false,
            message:
                'OTP expired. Request a new one.'
        });
    }

    if (parseInt(otp, 10) === pendingOtp) {

        pendingOtp = null;
        otpExpiry = null;

        return res.json({
            success: true
        });

    } else {

        return res.json({
            success: false,
            message:
                'Incorrect OTP. Try again.'
        });
    }
});

/* =========================================================
   ESCAPE HTML
   Prevent HTML injection inside email
========================================================= */

function escapeHtml(value) {

    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* =========================================================
   CONTACT FORM EMAIL

   IMPORTANT:
   Supabase remains on FRONTEND.

   This endpoint ONLY sends the email.
========================================================= */

app.post('/api/contact-email', async (req, res) => {

    const {
        name,
        email,
        phone,
        message
    } = req.body;

    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (!name || !email || !message) {

        return res.status(400).json({
            success: false,
            message:
                'Please fill all required fields.'
        });
    }

    try {

        /* -----------------------------------------
           CLEAN DATA
        ----------------------------------------- */

        const cleanName =
            String(name).trim();

        const cleanEmail =
            String(email).trim();

        const cleanPhone =
            String(phone || '').trim();

        const cleanMessage =
            String(message).trim();

        /* -----------------------------------------
           SEND EMAIL
        ----------------------------------------- */

        await transporter.sendMail({

            from:
                `"NLETA Website" <${process.env.SMTP_USER}>`,

            to:
                process.env.ADMIN_EMAIL ||
                'info@nleta.org.in',

            replyTo:
                cleanEmail,

            subject:
                'New Contact Form Enquiry - NLETA',

            html: `
                <!DOCTYPE html>

                <html>

                <head>
                    <meta charset="UTF-8">

                    <title>
                        New NLETA Enquiry
                    </title>
                </head>

                <body
                    style="
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    "
                >

                    <h2>
                        New Contact Form Enquiry
                    </h2>

                    <hr>

                    <p>
                        <strong>Name:</strong>
                        ${escapeHtml(cleanName)}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHtml(cleanEmail)}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${escapeHtml(
                            cleanPhone ||
                            'Not provided'
                        )}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <div
                        style="
                            padding: 15px;
                            background: #f5f5f5;
                            border-radius: 8px;
                            white-space: pre-wrap;
                        "
                    >
                        ${escapeHtml(cleanMessage)}
                    </div>

                    <br>

                    <p>
                        This enquiry was submitted
                        through the NLETA website.
                    </p>

                </body>

                </html>
            `
        });

        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        return res.json({
            success: true,
            message:
                'Email sent successfully.'
        });

    } catch (error) {

        console.error(
            'Email sending failed:',
            error
        );

        return res.status(500).json({
            success: false,
            message:
                'Failed to send email. Please try again.'
        });
    }
});

/* =========================================================
   START SERVER
========================================================= */

if (require.main === module) {

    app.listen(PORT, () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    });
}

/* =========================================================
   EXPORT EXPRESS APP
   Required for Vercel
========================================================= */

module.exports = app;