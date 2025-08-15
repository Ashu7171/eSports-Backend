const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    gameId: { type: String, required: true },
    gameName: { type: String, required: true },
    gameDateTime: { type: Date, required: true },
    description: { type: String },
    roomNo: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
