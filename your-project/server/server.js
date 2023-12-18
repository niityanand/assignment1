const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Enrollment = require('../models/enrollment'); // Adjust the path as needed

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use(bodyParser.json());

app.post('/enroll', async (req, res) => {
  try {
    const userData = req.body;

    if (!userData || !userData.age || !userData.batch) {
      return res.status(400).json({ error: 'Invalid data. Age and batch are required.' });
    }

    const newEnrollment = new Enrollment({
      age: userData.age,
      batch: userData.batch,
    });

    await newEnrollment.save();

    const paymentDetails = { amount: 500, description: 'Yoga Class Monthly Fee' };
    const paymentResponse = completePayment(userData, paymentDetails);

    if (paymentResponse.status === 'success') {
      res.json({ status: 'success', message: 'Enrollment and payment successful!' });
    } else {
      res.json({ status: 'error', message: 'Payment failed. Please try again.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
