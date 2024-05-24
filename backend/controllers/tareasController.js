const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler(async (req, res) => {

    const tareas = await Tarea.find()

    res.status(200).json(tareas)
})

const crearTareas = asyncHandler(async (req, res) => {

    if (!req.body.texto) {
        res.status(400)
        throw new Error('No tecleaste el texto')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(404)
        throw new Error("La tarea especificada no existe")
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(404)
        throw new Error("La tarea especificada no existe")
    }

    //const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id)
    await tarea.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}

