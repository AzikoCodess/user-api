// console.log("Salom Node.js!");

// const os = require("os");

// console.log("Kompyuter nomi:", os.hostname());
// console.log("Operatsion sistema:", os.platform());
// console.log("RAM:", Math.round(os.totalmem() / 1024 / 1024 / 1024), "GB");

// const fs = require("fs");

// Fayl yaratish
// fs.writeFileSync("salom.txt", "Salom Node.js!");

// Fayl o'qish
// const content = fs.readFileSync("salom.txt", "utf8");
// console.log(content);
// const fs = require("fs");

// 1. Fayl yarat
// fs.writeFileSync("users.txt", "Ali\n");

// 2. Fayl oxiriga qo'sh
// fs.appendFileSync("users.txt", "Vali\n");
// fs.appendFileSync("users.txt", "Hasan\n");

// 3. O'qi
// const content = fs.readFileSync("users.txt", "utf8");
// console.log(content);

/*
const server = http.createServer((req, res) => {
    if (req.url === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(users))
        } else if (req.url.startsWith("/users/")) {
            const id = req.url.split("/")[2]
            const user = users.find(u => u.id === Number(id))
            if (user) {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(user))
                } else {
                    res.writeHead(404, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ error: "User topilmadi" }))
                }
                } else {
        res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Sahifa topilmadi" }))
    }
    });*/
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB ga ulandi! ✅"))
    .catch(err => console.log("Xato:", err));

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")

app.use("/auth", authRoutes)
app.use("/users", userRoutes)

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "User API"
        },
        servers: [
            { url: `https://user-api-production-291d.up.railway.app` }
        ]
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(process.env.PORT, () => {
    console.log(`Server ishlamoqda: user-api-production-291d.up.railway.app port: ${process.env.PORT}`);
});