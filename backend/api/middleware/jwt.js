const jwt = require('jsonwebtoken');
require ('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Acceso denegado. Token requerido" });
        }

        token = token.split(" ")[1]; 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guarda los datos del usuario en la request
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};