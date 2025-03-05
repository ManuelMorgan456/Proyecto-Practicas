const estudiantesModel = require('../models/estudiantesModel.js').estudiantesModel
const estudiantesController = {}
const config = require('../../config.js').config
const { request, response } = require('express')
const nodemailer = require('nodemailer')
const { emit } = require('nodemon')



//  Registrar un estudiante
estudiantesController.Registrar = function (req, res) {
    const post = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password, // Se encriptará en el modelo
        promedio: req.body.promedio,
        materiasReprobadas: req.body.materiasReprobadas,
        creditosAprobados: req.body.creditosAprobados,
        ingresosMensuales: req.body.ingresosMensuales,
        gastosMensuales: req.body.gastosMensuales,
        deudasPendientes: req.body.deudasPendientes
    };

    // Validaciones
    if (!post.nombre || !post.email || !post.password) {
        return res.json({ state: false, mensaje: "Todos los campos son obligatorios" });
    }

    estudiantesModel.Registrar(post, function (respuesta) {
        res.json(respuesta);
    });
};

//  Calcular puntaje crediticio
estudiantesController.CalcularPuntaje = function (req, res) {
    const post = {
        email: req.body.email
    };

    if (!post.email) {
        return res.json({ state: false, mensaje: "El email es obligatorio" });
    }

    estudiantesModel.CalcularPuntaje(post, function (respuesta) {
        res.json(respuesta);
    });
};

//  Obtener puntaje crediticio
estudiantesController.ObtenerPuntaje = function (req, res) {
    const email = req.body.email;

    if (!email) {
        return res.json({ state: false, mensaje: "El email es obligatorio" });
    }

    estudiantesModel.ObtenerPuntaje(email, function (respuesta) {
        res.json(respuesta);
    });
};













module.exports.estudiantesController = estudiantesController