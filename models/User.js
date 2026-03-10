const mongoose = require("mongoose");

// Asosiy ma'lumot qanday ko'rinishda saqlanadi
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;