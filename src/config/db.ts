import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

mongoose.set('strictQuery', false)
dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
    } catch (err) {
        console.log(err)
    }
}