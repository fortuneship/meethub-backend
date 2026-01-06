require('dotenv').config();
const { sendEmail } = require('./utils/mailer');

(async () => {
  try {
    await sendEmail(
      'scheppar@gmail.com',
      'MeetHub Test Email',
      '<h1>Hello from MeetHub!</h1><p>This is a test email.</p>'
    );
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Email failed:', err.message);
  }
})();
