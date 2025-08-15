const express = require('express');
const {
    createTournament,
    getTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament
} = require('../controllers/tournamentController');

const router = express.Router();

router.post('/', createTournament);       // Create
router.get('/', getTournaments);          // Read all
router.get('/:id', getTournamentById);    // Read one
router.put('/:id', updateTournament);     // Update
router.delete('/:id', deleteTournament);  // Delete

module.exports = router;
