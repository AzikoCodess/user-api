const mongoose = require("mongoose");

const arxivSchema = new mongoose.Schema({
    name: String,
    age: Number,
    yaratilgan_vaqti: Date, // Asosiy bazada qachon yaratilgan
    ozgargan_vaqti: Date,   // Asosiy bazada qachon o'zgargan
    arxivga_qoshilgan_vaqti: { type: Date, default: Date.now } // Arxivga o'tgan aniq vaqt
});

const UserArxiv = mongoose.model("UserArxiv", arxivSchema);

module.exports = UserArxiv;