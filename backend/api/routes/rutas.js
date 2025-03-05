const estudiantesControler = require("./api/controladores/estudiantesControler.js").estudiantesControler
const express = require("express");
const router = express.Router();


// Rutas
router.post("/estudiantes/Registrar", function (req, res) {
    estudiantesControler.Registrar(req, res);
});

router.post("/estudiantes/CalcularPuntaje", function (req, res) {
    estudiantesControler.CalcularPuntaje(req, res);
});

router.post("/estudiantes/ObtenerPuntaje", function (req, res) {
    estudiantesControler.ObtenerPuntaje(req, res);
});







module.exports = router;