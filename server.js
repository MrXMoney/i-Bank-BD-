// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const accountSid = 'AC8043c786ed2b94ecb6a3ecb35dc0d2b0';
const authToken = '93784d95b24b1099d1de4cbaf3daa187';
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/call', (req, res) => {
  const toNumber = req.body.to;

  if (!toNumber) {
    return res.status(400).json({ message: 'No phone number provided.' });
  }

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: toNumber,
      from: '+1857855-5760'  // <-- আপনার টুইলিও নাম্বার দিন এখানে
    })
    .then(call => {
      console.log('✅ Call SID:', call.sid);
      res.json({ message: 'Call placed successfully!' });
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      res.status(500).json({ message: 'Call failed', error: err.message });
    });
});

app.listen(port, () => {
  console.log(`🚀 Server is running: http://localhost:${port}`);
});
