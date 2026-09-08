const REASON_TO = {
  'General Inquiry': 'delulufinds78@gmail.com',
  'Product Suggestion': 'delulufinds78@gmail.com',
  'Report an Issue': 'delulufinds78@gmail.com',
  'Partnership / Business': 'contact@delulufinds.me',
};

const VALID_REASONS = Object.keys(REASON_TO);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, reason, message } = req.body || {};

  if (!name || !email || !reason || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!VALID_REASONS.includes(reason)) {
    return res.status(400).json({ error: 'Invalid reason.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const to = REASON_TO[reason];

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
      <p style="margin:0 0 4px"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p style="margin:0 0 12px"><strong>Reason:</strong> ${reason}</p>
      <hr style="border:none;border-top:1px solid #e5e5e5;margin:12px 0"/>
      <p style="white-space:pre-wrap;margin:0">${message}</p>
    </div>
  `;

  const payload = {
    from: 'Delulu Finds <contact@delulufinds.me>',
    to: [to],
    reply_to: email,
    subject: `New contact form: ${reason} — ${name}`,
    html,
  };

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      console.error('Resend error:', resp.status, body);
      return res.status(502).json({ error: 'Failed to send message. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
