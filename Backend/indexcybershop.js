const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Inisialisasi Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect(
  'mongodb+srv://cybershop:cybershop@cluster0.2i9vhga.mongodb.net/CyberShopDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Definisi Model User
const User = mongoose.model('User', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Endpoint Signup
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      // Cek jika email sudah terdaftar
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ message: 'Email already in use' });
      }
  
      // Hash password dan simpan user baru
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ firstName, lastName, email, password: hashedPassword });
      await user.save();
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error signing up user', error });
    }
  });
  
  // Endpoint Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Verifikasi password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
  
      res.send({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error logging in', error });
    }
  });
  