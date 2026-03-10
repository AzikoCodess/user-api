const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
    console.log("Token:", token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded:", decoded)
        req.user = decoded
        next()
    } catch (error) {
        console.log("Error:", error)
        return res.status(401).json({ error: error.message })
    }
}
module.exports = authMiddleware;