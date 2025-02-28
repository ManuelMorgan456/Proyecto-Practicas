const config = {
    email: {}
}

config.urlReal = "http://localhost:4200"
config.puerto = 3000
config.bd = "ProyectoPracticas"
config.secret = "sfg541sfs2f4g5435erd3dfge4d8st1gf*f9g6sdfs/fd8g5ssdtytu7sfd/&%TGdr"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "dbpruebasdeveloper@gmail.com"
config.email.pass = "bbbyfovmoyoprtnz"
config.expiration = 60000 * 5
config.whitelist = [
    "http://localhost:4200"
]

// const config = {
//     urlReal: process.env.URL_REAL || "http://localhost:4200",
//     puerto: process.env.PORT || 3000,

//     // Configuración de la base de datos
//     bd: process.env.DB_NAME || "ProyectoPracticas",
//     bdtest: process.env.DB_NAME_TEST || "ProyectoPracticasTest",
//     bdUser: process.env.DB_USER || "",
//     bdPass: process.env.DB_PASS || "",
//     bdIp: process.env.DB_IP || "127.0.0.1",
//     bdPort: process.env.DB_PORT || "27018",
//     mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/miBaseDeDatos",

//     // Clave secreta
//     secret: process.env.SECRET_KEY || "clave_por_defecto",

//     // Lista blanca de CORS (convierte la cadena en un array)
//     whitelist: (process.env.WHITELIST || "http://localhost:4200,http://localhost:9876").split(","),

//     // Configuración del correo
//     email: {
//         host: process.env.EMAIL_HOST || "smtp.gmail.com",
//         port: process.env.EMAIL_PORT || 587,
//         user: process.env.EMAIL_USER || "",
//         pass: process.env.EMAIL_PASS || ""
//     },

//     // Expiración de la sesión
//     expiracion: process.env.EXPIRACION || 3600000
// };

module.exports = { config };
