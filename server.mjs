import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import twilio from 'twilio';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from './models/user.js'; // Adjust the path as needed
import bcrypt from 'bcrypt'; // For password hashing
const SALT_ROUNDS = 10; // Adjust hashing strength


dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-alert', async (req, res) => {
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
  
