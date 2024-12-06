import express from 'express'
import{
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    addUser
} from '../controllers/user_controller.js'

import { authenticate, authorize } from "../controllers/auth_controller.js"
import { IsAdmin } from "../middleware/role_validation.js"

const app = express()

app.get('/', getAllUser)   
app.get('/:id',getUserById)
app.post('/addUser',addUser)
app.put('/:id',authorize, [IsAdmin],updateUser)
app.delete('/:id',authorize, [IsAdmin],deleteUser)

app.post('/login', authenticate)

export default app