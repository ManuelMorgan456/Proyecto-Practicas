var middleware = {}

middleware.Soloadmin = function (request, response, next) {
    console.log(request.session.rol)
    if (request.session.rol != "Administrador") {
        return response.status(403).json({ state: false, mensaje: "Solo los Administradores pueden usar esta api" })
    }
    next()
}

middleware.Obligalogin = function (request, response, next) {
    console.log(request.session.rol)
    if (request.session.rol == undefined) {
        return response.status(401).json({ state: false, mensaje: "Debe Iniciar Sesion!" })
    }
    next()
}


module.exports.middleware = middleware