import express from 'express'
import vehicleRouter from './routes/vehicleRouter'
import { connectDB } from './config/db'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url'
import path from 'path'
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000
const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname + '\\..\\views')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'));
app.use('/', vehicleRouter)

connectDB()

app.get('*', (req, res) => {
    res.status(404).render('404');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})