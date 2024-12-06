import express from "express"
import{
    getAllPengembalian,
    getPengembalianById,
    addPengembalian,
    updatePengembalian,
    deletePengembalian
} from '../controllers/Pengembalian_controller.js'

const app = express()

app.get('/', getAllPengembalian)   
app.get('/:id',getPengembalianById)
app.post('/', addPengembalian) 
app.get('/:id',updatePengembalian) 
app.delete('/:id', deletePengembalian)

export default app