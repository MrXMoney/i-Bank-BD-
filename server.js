const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// ✅ Twilio Credentials
const accountSid = 'AC8043c786ed2b94ecb6a3ecb35dc0d2b0';
const authToken = '93784d95b24b1099d1de4cbaf3daa187';
const client = require('twilio')(accountSid, authToken);

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // serve index.html from /public folder

// ✅ API Route to Make Call
app.post('/call', (req, res) => {
  const toNumber = req.body.to;

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: toNumber,
      from: '+1415XXXXXXX' // <-- Replace with your Twilio number
    })
    .then(call => {
      console.log(`✅ Call placed: ${call.sid}`);
      res.json({ message: '📞 Call placed successfully!' });
    })
    .catch(error => {
      console.error('❌ Call error:', error);
      res.status(500).json({ message: '❌ Call failed.', error });
    });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running: http://localhost:${port}`);
});
