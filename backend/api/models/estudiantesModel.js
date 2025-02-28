const estudiantesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const crypto = require('crypto')

// Definición del esquema
const estudiantesSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true }, // Encriptada con SHA256
    estado: { type: Number, enum: [0, 1], default: 1 }, // 1 = Activo, 0 = Inactivo

    // Datos Académicos
    promedio: { type: Number, required: true, min: 0, max: 10 },
    materiasReprobadas: { type: Number, required: true, min: 0 },
    creditosAprobados: { type: Number, required: true, min: 0, max: 100 },

    // Datos Financieros
    ingresosMensuales: { type: Number, required: true, min: 0 },
    gastosMensuales: { type: Number, required: true, min: 0 },
    deudasPendientes: { type: Number, required: true, min: 0 },

    // Información de Evaluación Crediticia
    puntajeCrediticio: { type: Number, default: 0 },
    nivelRiesgo: { type: String, enum: ['Alto', 'Medio', 'Bajo'], default: 'Medio' },

    // Datos de Recuperación de Cuenta
    codigoRecuperacion: { type: String },
    fechaRecuperacion: { type: Date },
})

const Mymodel = mongoose.model("Estudiante", estudiantesSchema)

// Registrar un estudiante
estudiantesModel.Registrar = function (post, callback) {
    const passwordHash = crypto.createHash('sha256').update(post.password).digest('hex');

    let { puntaje, nivelRiesgo } = calcularPuntaje(post);

    const nuevoEstudiante = new Mymodel({
        nombre: post.nombre,
        email: post.email,
        telefono: post.telefono,
        password: passwordHash,
        estado: 1,
        promedio: post.promedio,
        materiasReprobadas: post.materiasReprobadas,
        creditosAprobados: post.creditosAprobados,
        ingresosMensuales: post.ingresosMensuales,
        gastosMensuales: post.gastosMensuales,
        deudasPendientes: post.deudasPendientes,
        puntajeCrediticio: puntaje,
        nivelRiesgo: nivelRiesgo
    });

    nuevoEstudiante.save()
        .then(() => callback({ state: true, mensaje: "Estudiante registrado correctamente" }))
        .catch(err => callback({ state: false, mensaje: "Error al registrar el estudiante", error: err }));
};

// Función para calcular el puntaje crediticio
function calcularPuntaje(estudiante) {
    let puntaje = 0;

    // Historial académico
    puntaje += estudiante.promedio * 10;
    puntaje -= estudiante.materiasReprobadas * 5;
    puntaje += estudiante.creditosAprobados * 0.5;

    // Situación financiera
    let capacidadPago = estudiante.ingresosMensuales - estudiante.gastosMensuales - estudiante.deudasPendientes;
    puntaje += (capacidadPago > 0) ? 20 : -20;

    // Clasificación de riesgo
    let nivelRiesgo = 'Medio';
    if (puntaje >= 80) nivelRiesgo = 'Bajo';
    else if (puntaje <= 40) nivelRiesgo = 'Alto';

    return { puntaje, nivelRiesgo };
}

// Calcular y actualizar el puntaje crediticio
estudiantesModel.CalcularPuntaje = function (post, callback) {
    Mymodel.findOne({ email: post.email })
        .then(estudiante => {
            if (!estudiante) {
                return callback({ state: false, mensaje: "Estudiante no encontrado" });
            }

            let { puntaje, nivelRiesgo } = calcularPuntaje(estudiante);

            estudiante.puntajeCrediticio = puntaje;
            estudiante.nivelRiesgo = nivelRiesgo;

            estudiante.save()
                .then(() => callback({ state: true, mensaje: "Puntaje actualizado", puntaje, nivelRiesgo }))
                .catch(err => callback({ state: false, mensaje: "Error al actualizar puntaje", error: err }));
        })
        .catch(err => callback({ state: false, mensaje: "Error en la base de datos", error: err }));
};

// Obtener puntaje crediticio de un estudiante
estudiantesModel.ObtenerPuntaje = function (email, callback) {
    Mymodel.findOne({ email })
        .then(estudiante => {
            if (!estudiante) {
                return callback({ state: false, mensaje: "Estudiante no encontrado" });
            }

            return callback({
                state: true,
                email: estudiante.email,
                puntajeCrediticio: estudiante.puntajeCrediticio,
                nivelRiesgo: estudiante.nivelRiesgo
            });
        })
        .catch(err => callback({ state: false, mensaje: "Error en la base de datos", error: err }));
};

estudiantesModel.Mymodel = Mymodel
module.exports.estudiantesModel = estudiantesModel