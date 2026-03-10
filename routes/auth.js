const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

router.use(express.json())

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Ro'yxatdan o'tish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli ro'yxatdan o'tdingiz!
 *       400:
 *         description: Xatolik
 */

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, age } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name, email,
            password: hashedPassword,
            age
        })

        await newUser.save()

        res.status(201).json({ newUser, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token qaytaradi
 *       404:
 *         description: User topilmadi
 *       401:
 *         description: Noto'g'ri parol
 */

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User topilmadi" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Noto'g'ri parol" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;
