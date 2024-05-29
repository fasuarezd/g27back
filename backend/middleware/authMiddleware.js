const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    //definimos la variable token
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //obtenemos el token del encabezado
            token = req.headers.authorization.split(' ')[1]
            //verificar la firma y el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //voy a obtener los datos del usuario del token verificado
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporciono el token')
    }
})

module.exports = { protect }