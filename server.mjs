import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/send-alert', async (req, res) => {
  const { lat, lon } = req.body;

  console.log('SOS alert received:', { lat, lon });

  try {
    const message = await twilioClient.messages.create({
      body: `SOS Alert! Location: Latitude: ${lat}, Longitude: ${lon}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RECIPIENT_PHONE_NUMBER,
    });

    console.log('SMS sent successfully:', message.sid);
    res.status(200).send({ message: 'SOS alert received and SMS sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).send({ message: 'Failed to send SOS alert' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});