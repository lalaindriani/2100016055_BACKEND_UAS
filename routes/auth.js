const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pegawai } = require('../models/index');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { namaPegawai, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPegawai = await Pegawai.create({ namaPegawai, email, password: hashedPassword });
        res.status(201).json({ message: 'Pegawai registered successfully', newPegawai });
    } catch (err) {
        res.status(500).json({ message: 'Error registering Pegawai', error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pegawai = await Pegawai.findOne({ where: { email } });
        if (!pegawai) {
            return res.status(400).json({ message: 'Pegawai not found' });
        }

        const isMatch = await bcrypt.compare(password, pegawai.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ idPegawai: pegawai.idPegawai }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

module.exports = router;