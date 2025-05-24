import express from 'express';
import mongoose from 'mongoose';
import Appointment from '../models/appointmentModel.js'; // make sure path and extension are correct

const router = express.Router(); // Use Router instead of app

// Remove this line since middleware is handled in main app
// router.use(express.json()); 

router.post('/', async (req, res) => { // Change from '/api/appointment' to '/'
  try {
    const { name, contact, date, preferredTime, service } = req.body;

    // Basic validation (optional but recommended)
    if (!name || !contact || !date || !preferredTime || !service) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create and save the appointment
    const newAppointment = new Appointment({
      name,
      contact,
      date,
      preferredTime,
      service,
      status: 'pending' // default, but can be explicitly set
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: savedAppointment
    });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router; // Export router instead of app