const estudiantesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema


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
    puntajeCrediticio: { type: Number, default: 0 }, // Calculado por el algoritmo
    nivelRiesgo: { type: String, enum: ['Alto', 'Medio', 'Bajo'], default: 'Medio' }, // Clasificación de riesgo

    // Datos de Recuperación de Cuenta
    codigoRecuperacion: { type: String },
    fechaRecuperacion: { type: Date },
})

const Mymodel = mongoose.model("Estudiante", estudiantesSchema)
















estudiantesModel.Mymodel = Mymodel
module.exports.estudiantesModel = estudiantesModel