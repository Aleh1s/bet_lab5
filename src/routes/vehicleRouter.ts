import express from 'express'
import { createVehicle, homepage, editVehicle, editVehiclePage, deleteVehicle, addCarForm, getVehicleById } from '../controllers/vehicleController'

const router = express.Router()

router.get('/', homepage)

router.get('/add', addCarForm)
router.post('/add', createVehicle)

router.get('/vehicles/:id/edit', editVehiclePage)
router.put('/vehicles/:id', editVehicle)

router.delete('/vehicles/:id', deleteVehicle)
router.get('/api/vehicles/:id', getVehicleById)

export default router