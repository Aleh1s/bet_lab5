import mongoose, { Schema, Document } from 'mongoose'

interface IVehicle extends Document {
    make: string;
    vehicleModel: string;
    manufacturer: string;
    design: string;
    yearSold: number;
}

const VehicleSchema: Schema = new Schema({
    make: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturer: { type: String, required: true },
    design: { type: String, required: true },
    yearSold: { type: Number, required: true }
})

const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema)

export default Vehicle