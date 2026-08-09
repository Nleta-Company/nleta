const https = require('https');
const otpStore = {};

function resendSendEmail({ to, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Promise.resolve({ success: false, message: 'RESEND_API_KEY not set' });

  const body = JSON.stringify({
    from: 'NLETA Admin <onboarding@resend.dev>',
    to,
    subject,
    text,
    html,
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode === 200 || result.id) {
            resolve({ success: true });
          } else {
            resolve({ success: false, message: result.message || data });
          }
        } catch {
          resolve({ success: false, message: data });
        }
      });
    });

    req.on('error', (e) => resolve({ success: false, message: e.message }));
    req.write(body);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const body = JSON.parse(event.body || '{}');
  const { action, otp } = body;

  if (action === 'send_otp') {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    otpStore['delete_news'] = { otp: String(otpCode), time: Date.now() };

    const result1 = await resendSendEmail({
      to: '14vermaaryan@gmail.com',
      subject: 'NLETA Admin - OTP for Delete Action',
      text: `Your OTP for deleting news is: ${otpCode}\nValid for 5 minutes only.`,
      html: `<h2>NLETA Admin OTP</h2><p>Your OTP is: <strong>${otpCode}</strong></p><p>Valid for 5 minutes only.</p>`,
    });

    const result2 = await resendSendEmail({
      to: 'inspnleta@gmail.com',
      subject: 'NLETA Admin - OTP for Delete Action',
      text: `Your OTP for deleting news is: ${otpCode}\nValid for 5 minutes only.`,
      html: `<h2>NLETA Admin OTP</h2><p>Your OTP is: <strong>${otpCode}</strong></p><p>Valid for 5 minutes only.</p>`,
    });

    if (!result1.success || !result2.success) {
      return { statusCode: 200, body: JSON.stringify({ success: false, message: 'Failed to send email to one or more recipients' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'OTP sent to email.' }) };
  }

  if (action === 'verify_otp') {
    const stored = otpStore['delete_news'];
    if (stored && stored.otp === String(otp) && Date.now() - stored.time < 300000) {
      delete otpStore['delete_news'];
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    return { statusCode: 200, body: JSON.stringify({ success: false, message: 'Invalid or expired OTP' }) };
  }

  return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid action' }) };
};
