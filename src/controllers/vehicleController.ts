import { Request, Response } from 'express'
import Vehicle from '../models/Vehicle'

export const homepage = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query

        const pageNum = parseInt(page.toString())
        const limitNum = parseInt(limit.toString())

        const vehicles = await Vehicle.aggregate()
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .exec();

        const count = await Vehicle.countDocuments()

        res.render('index', {
            vehicles,
            total: count,
            pages: Math.ceil(count / limitNum),
            currentPage: pageNum
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const addCarForm = (_: Request, res: Response) => {
    res.render('addCarForm')
}

export const createVehicle = async (req: Request, res: Response) => {
    try {
        const newVehicle = new Vehicle({
            make: req.body.make,
            vehicleModel: req.body.vehicleModel,
            manufacturer: req.body.manufacturer,
            design: req.body.design,
            yearSold: req.body.yearSold
        })

        await newVehicle.save()

        res.redirect('/')
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const editVehiclePage = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const vehicle = await Vehicle.findById(id)

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' })
        }

        res.render('editVehicle', { vehicle })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' })
        }

        res.redirect('/')
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(id)

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' })
        }

        res.redirect('/')
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const vehicle = await Vehicle.findById(id)

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' })
        }

        res.json(vehicle)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}