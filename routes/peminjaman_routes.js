import express from "express"
import{
    getAllPeminjaman,
    getPeminjamanById,
    addPeminjaman,
    updatePeminjaman,
    deletePeminjaman,
    getUsageAnalysis,
    analyzeItems
} from '../controllers/peminjaman_controller.js'

// import { authorize } from "../controllers/auth_controller.js"
// import { IsAdmin } from "../middleware/role_validation.js"

const app = express()

app.get('/', getAllPeminjaman)   
app.get('/:id',getPeminjamanById)
app.post('/', addPeminjaman) 
app.get('/:id',updatePeminjaman) 
app.delete('/:id', deletePeminjaman)
app.post('/usage-report',getUsageAnalysis)
app.post('/borrow-analysis',analyzeItems)





export default app
