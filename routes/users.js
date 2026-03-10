const express = require("express");
const router = express.Router();
const User = require("../models/User")
const UserArxiv = require("../models/UserArxiv")
const authMiddleware = require("../middleware/auth")

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.use(express.json())

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Yangi user yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: User yaratildi
 *       400:
 *         description: Xatolik
 */

router.post("/", async (req, res) => {
    try {
        const { name, age } = req.body
        const newUser = new User({ name, age })
        await newUser.save()
        const allUsers = await User.find()
        res.status(201).json({ allUsers, newUser, message: "User muvaffaqiyatli yaratildi" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /users/edit/{id}:
 *   put:
 *     summary: Userni yangilash
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       404:
 *         description: User topilmadi
 */

router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, age } = req.body
        const oldUser = await User.findById(id)
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true, runValidators: true })
        const allUsers = await User.find()

        if (updatedUser) {
            res.json({ allUsers, oldUser, updatedUser, message: "User muvaffaqiyatli yangilandi" })
        } else {
            res.status(404).json({ error: "User topilmadi" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Userni o'chirish va arxivga saqlash
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'chirildi va arxivga tushdi
 *       404:
 *         description: User topilmadi
 */

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id

        // 1-QADAM: Bazadan uchirmasdan avval ishonch hosil qilish uchun topib olamiz
        const user = await User.findById(id)

        if (user) {
            // 2-QADAM: Topilgan odamni Arxiv Jadvaliga (UserArxiv ga) saqlaymiz
            // .toObject() va Spread (...) operatori yordamida hamma narsani 1 qatorda nusxalab olamiz!
            // Lekin asl mongoose yaratgan qadimgi vaqtlarni ajratib qo'yamiz
            const { createdAt, updatedAt, ...qolganMalumotlar } = user.toObject();

            const arxivUser = new UserArxiv({
                ...qolganMalumotlar,                  // name, age kabi yuzlab obektlarni yig'adi
                yaratilgan_vaqti: user.createdAt,     // bazada tugilgan on
                ozgargan_vaqti: user.updatedAt        // oxirgi marta ozgartirilgan vaqt
                // arxivga_qoshilgan_vaqti esa avtomatik (Date.now) qoyiladi
            })
            await arxivUser.save() // Arxivga saqlandi!

            // 3-QADAM: Arxivga tushgani aniq bo'lgach, asosiy bazadan o'chirib yuboramiz
            await User.findByIdAndDelete(id)

            res.json({ message: "Muvaffaqiyatli o'chirildi va Arxivga tushdi", deletedUser: user })
        } else {
            res.status(404).json({ error: "User topilmadi" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/**
 * @swagger
 * /users/allUsers:
 *   get:
 *     summary: Barcha userlarni olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Userlar ro'yxati
 *       401:
 *         description: Token yo'q
 */

router.get("/allUsers", authMiddleware, async (req, res) => {
    const users = await User.find()
    const formattedUsers = users.map(user => {

        let qoshilganVaqt = "Vaqt yo'q"
        let editQoshilganVaqt = "Vaqt yo'q"
        if (user.createdAt) {
            const sanaQismi = new Date(user.createdAt).toLocaleDateString("uz-UZ", { day: '2-digit', month: '2-digit', year: 'numeric' })
            const soatQismi = new Date(user.createdAt).toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            const editQismi = new Date(user.updatedAt).toLocaleDateString("uz-UZ", { day: '2-digit', month: '2-digit', year: 'numeric' })
            const editSoatQismi = new Date(user.updatedAt).toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            editQoshilganVaqt = `${editQismi} ${editSoatQismi}`
            qoshilganVaqt = `${sanaQismi} ${soatQismi}`
        }

        return {
            id: user._id,
            name: user.name,
            age: user.age,
            yaratilgan_sana: qoshilganVaqt,
            editlangan_sana: editQoshilganVaqt
        }
    })

    res.json(formattedUsers)
})


/**
 * @swagger
 * /users/arxivUsers:
 *   get:
 *     summary: Arxivdagi userlarni olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Userlar ro'yxati
 *       401:
 *         description: Token yo'q
 */

router.get("/arxivUsers", authMiddleware, async (req, res) => {
    const arxivUsers = await UserArxiv.find()

    // O'xshashlik uchun faqat vaqtlarni chiroyli qilib formatlaymiz
    const formattedArxiv = arxivUsers.map(user => {
        const vaqtFormati = (date) => {
            if (!date) return "Vaqt yo'q";
            const sana = new Date(date).toLocaleDateString("uz-UZ", { day: '2-digit', month: '2-digit', year: 'numeric' });
            const soat = new Date(date).toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return `${sana} ${soat}`;
        }

        return {
            id: user._id,
            name: user.name,
            age: user.age,
            yaratilgan_vaqti: vaqtFormati(user.yaratilgan_vaqti),
            ozgargan_vaqti: vaqtFormati(user.ozgargan_vaqti),
            arxivga_qoshilgan_vaqti: vaqtFormati(user.arxivga_qoshilgan_vaqti)
            // Arxivga qachon kelib tushgani ↑
        }
    })

    res.json(formattedArxiv)
})

module.exports = router;