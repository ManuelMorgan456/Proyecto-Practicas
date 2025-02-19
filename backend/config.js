require('dotenv').config();

const config = {
    urlReal: process.env.URL_REAL || "http://localhost:4200",
    puerto: process.env.PORT || 3000,

    // Configuración de la base de datos
    bd: process.env.DB_NAME || "ProyectoPracticas",
    bdtest: process.env.DB_NAME_TEST || "ProyectoPracticasTest",
    bdUser: process.env.DB_USER || "",
    bdPass: process.env.DB_PASS || "",
    bdIp: process.env.DB_IP || "127.0.0.1",
    bdPort: process.env.DB_PORT || "27017",
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/miBaseDeDatos",

    // Clave secreta
    secret: process.env.SECRET_KEY || "clave_por_defecto",

    // Lista blanca de CORS (convierte la cadena en un array)
    whitelist: (process.env.WHITELIST || "http://localhost:4200,http://localhost:9876").split(","),

    // Configuración del correo
    email: {
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: process.env.EMAIL_PORT || 587,
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || ""
    },

    // Expiración de la sesión
    expiracion: process.env.EXPIRACION || 3600000
};

module.exports = { config };
