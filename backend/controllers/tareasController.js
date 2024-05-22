const asyncHandler = require('express-async-handler')

const getTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Tareas' })
})

const crearTareas = asyncHandler(async (req, res) => {

    if (!req.body.texto) {
        res.status(400)
        throw new Error('No tecleaste el texto')
    }

    res.status(201).json({ message: 'Crear Tareas' })
})

const updateTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Actualizar la tarea con id: ${req.params.id}` })
})

const deleteTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Eliminar la tarea con id: ${req.params.id}` })
})

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}

