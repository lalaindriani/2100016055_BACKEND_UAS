const express = require('express');
const router = express.Router();
const { Pegawai } = require('../models/');
const { authenticate } = require('../middleware/auth');

// Contoh rute yang menggunakan autentikasi
router.get('/', authenticate, async (req, res) => {
    try {
        const pegawai = await Pegawai.findAll();
        res.json(pegawai);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Contoh rute yang menggunakan autentikasi dan otorisasi
router.post('/', authenticate, async (req, res) => {
    try {
        const newPegawai = await Pegawai.create(req.body);
        res.status(201).json(newPegawai);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;