import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import twilio from 'twilio';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.js'; 
import bcrypt from 'bcrypt'; 
const SALT_ROUNDS = 10; 
import nodemailer from 'nodemailer';


dotenv.config();

const PORT = process.env.PORT ; // Use the PORT from .env or default to 5000


// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();


// app.use(cors({
//   origin: ['http://localhost:5173', 'https://women-safety1.netlify.app/'], 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://women-safety1.netlify.app/'], 
//   credentials: true
// }));


// app.use(bodyParser.json());
// app.use(cors());

app.use(cors({
  origin: [
    'http://localhost:5173',              // Local development
    'https://women-safety1.netlify.app', // Your deployed frontend
    'https://women-safety-backend-poho.onrender.com'
   
  ],
  credentials: true
}));




app.post('/send-alert', async (req, res) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  console.log('🚨 SOS alert received:', { lat, lon });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // app password
    },
  });

  const mailOptions = {
    from: `"SOS Alert System" <${process.env.GMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: '🚨 SOS Alert - Immediate Action Required',
    text: `An SOS alert was triggered!\n\nLatitude: ${lat}\nLongitude: ${lon}\n\n📍 https://maps.google.com/?q=${lat},${lon}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ SOS email sent:', info.response);
    res.status(200).json({ message: 'SOS alert sent via email!' });
  } catch (error) {
    console.error('❌ Error sending SOS email:', error);
    res.status(500).json({ message: 'Failed to send SOS email.' });
  }
});


// app.post('/send-alert', async (req, res) => {
//   const { lat, lon } = req.body;

//   console.log('SOS alert received:', { lat, lon });

//   try {
//     const message = await twilioClient.messages.create({
//       body: `SOS Alert! Location: Latitude: ${lat}, Longitude: ${lon}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: process.env.RECIPIENT_PHONE_NUMBER,
//     });

//     console.log('SMS sent successfully:', message.sid);
//     res.status(200).send({ message: 'SOS alert received and SMS sent successfully' });
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//     res.status(500).send({ message: 'Failed to send SOS alert' });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




//Database Connection


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));






 //User Signup

  app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    
    // console.log('Received signup data:', { username, email, password });
  
   
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
    
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
 
      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


  import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
// import express from 'express';
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
