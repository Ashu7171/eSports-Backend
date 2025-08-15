const express = require('express');

const { createUser, getUsers, getUserById, updateUser, deleteUser ,forgotPassword, resetPassword ,loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/login', loginUser);

// POST request to send reset link
router.post('/forgot-password', forgotPassword);

// POST request to reset password using token
router.post('/reset-password/:token', resetPassword);

module.exports = router;
