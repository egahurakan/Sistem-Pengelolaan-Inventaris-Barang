import express from "express"
import{
    getAllBarang,
    getBarangById,
    addBarang,
    updateBarang,
    deleteBarang
} from '../controllers/barang_controller.js'

const app = express()

import { authenticate,authorize } from "../controllers/auth_controller.js"
import { IsAdmin } from "../middleware/role_validation.js"

app.get('/', getAllBarang)   
app.get('/:id',getBarangById)
app.post('/',authorize, addBarang) 
app.put('/:id',authorize,updateBarang) 
app.delete('/:id', deleteBarang)

export default app
