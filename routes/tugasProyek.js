const express = require('express');
const router = express.Router();
const { TugasProyek } = require('../models');
const { authenticate } = require('../middleware/auth');

// Create a new TugasProyek
router.post('/',authenticate, async (req, res) => {
    try {
        const tugasProyek = await TugasProyek.create(req.body);
        res.status(201).json(tugasProyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all TugasProyek
router.get('/', authenticate, async (req, res) => {
    try {
        const tugasProyek = await TugasProyek.findAll();
        res.status(200).json(tugasProyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a TugasProyek by ID
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

// Update a TugasProyek by ID
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

// Delete a TugasProyek by ID
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

module.exports = router;