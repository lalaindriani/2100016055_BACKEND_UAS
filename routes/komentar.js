const express = require('express');
const router = express.Router();
const { Komentar } = require('../models/');
const { authenticate } = require('../middleware/auth');

// Create a new Komentar
router.post('/', authenticate, async (req, res) => {
    try {
        const komentar = await Komentar.create(req.body);
        res.status(201).json(komentar);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all Komentar
router.get('/', authenticate, async (req, res) => {
    try {
        const komentar = await Komentar.findAll();
        res.status(200).json(komentar);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a Komentar by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const komentar = await Komentar.findByPk(req.params.id);
        if (komentar) {
            res.status(200).json(komentar);
        } else {
            res.status(404).json({ error: 'Komentar not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a Komentar by ID
router.put('/:id', authenticate,  async (req, res) => {
    try {
        const [updated] = await Komentar.update(req.body, {
            where: { idKomentar: req.params.id }
        });
        if (updated) {
            const updatedKomentar = await Komentar.findByPk(req.params.id);
            res.status(200).json(updatedKomentar);
        } else {
            res.status(404).json({ error: 'Komentar not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a Komentar by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Komentar.destroy({
            where: { idKomentar: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Komentar not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;