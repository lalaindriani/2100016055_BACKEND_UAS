const express = require('express');
const router = express.Router();
const { TugasProyek } = require('../models');
const { authenticate } = require('../middleware/auth');

// Berfungsi untuk membuat TugasProyek bary dengan menggunakan authenticate middleware untuk otentikasi.
router.post('/',authenticate, async (req, res) => {
    try {
        const tugasProyek = await TugasProyek.create(req.body);
        res.status(201).json(tugasProyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Berfungsi untuk mendapatkan semua daftar Tugas Proyek yang sudah dibuat dan mengambil semua entitas Tugas Proyek. 
router.get('/', authenticate, async (req, res) => {
    try {
        const tugasProyek = await TugasProyek.findAll();
        res.status(200).json(tugasProyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Berfungsi untuk mendapatkan Tugas Proyek yang diinginkan berdasarkan ID Proyek sebagai Primary Key.
router.get('/:id', authenticate, async (req, res) => {
    try {
        const tugasProyek = await TugasProyek.findByPk(req.params.id);
        if (tugasProyek) {
            res.status(200).json(tugasProyek);
        } else {
            res.status(404).json({ error: 'TugasProyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Berfungsi untuk memperbarui entitas dari Tugas Proyek yang telah dibuat. Jika entitas sudah diperbarui maka fungsi mengambil
// kembali entitas yang diperbarui dan mengembalikan status serta data pada updatedTugasProyek.
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [updated] = await TugasProyek.update(req.body, {
            where: { idTugas: req.params.id }
        });
        if (updated) {
            const updatedTugasProyek = await TugasProyek.findByPk(req.params.id);
            res.status(200).json(updatedTugasProyek);
        } else {
            res.status(404).json({ error: 'TugasProyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Berfugsi untuk menghapus entitas pada Tugas Proyek berdasarkan ID Tugas Proyek.
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await TugasProyek.destroy({
            where: { idTugas: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'TugasProyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Digunakan untuk mengekspor router untuk digunakan dalam aplikasi Express.
module.exports = router;
