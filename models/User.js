const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                const minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
                return value <= minDate; // At least 12 years old
            },
            message: "User must be at least 12 years old."
        }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'member'], 
        default: 'member' 
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
