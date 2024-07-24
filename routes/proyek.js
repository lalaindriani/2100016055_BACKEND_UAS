const express = require('express');
const router = express.Router();
const { Proyek } = require('../models');
const { authenticate } = require('../middleware/auth');

// Create a new Proyek
router.post('/', authenticate, async (req, res) => {
    try {
        const proyek = await Proyek.create(req.body);
        res.status(201).json(proyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all Proyek
router.get('/', authenticate, async (req, res) => {
    try {
        const proyek = await Proyek.findAll();
        res.status(200).json(proyek);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a Proyek by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const proyek = await Proyek.findByPk(req.params.id);
        if (proyek) {
            res.status(200).json(proyek);
        } else {
            res.status(404).json({ error: 'Proyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a Proyek by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [updated] = await Proyek.update(req.body, {
            where: { idProyek: req.params.id }
        });
        if (updated) {
            const updatedProyek = await Proyek.findByPk(req.params.id);
            res.status(200).json(updatedProyek);
        } else {
            res.status(404).json({ error: 'Proyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a Proyek by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Proyek.destroy({
            where: { idProyek: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Proyek not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;