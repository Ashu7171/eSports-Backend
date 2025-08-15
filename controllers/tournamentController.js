const Tournament = require('../models/Tournament');

// Create Tournament
const createTournament = async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        res.status(201).json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Tournaments
const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Tournament By ID
const getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
        res.json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Tournament
const updateTournament = async (req, res) => {
    try {
        const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Tournament
const deleteTournament = async (req, res) => {
    try {
        await Tournament.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tournament deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTournament, getTournaments, getTournamentById, updateTournament, deleteTournament };
