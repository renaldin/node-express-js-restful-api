import express from "express"
import userController from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import contactController from "../controller/contactController.js"

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// user route
userRouter.get('/api/users/current', userController.get)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

// contact route
userRouter.post('/api/contact', contactController.create)
userRouter.get('/api/contact/:contactId', contactController.get)
userRouter.put('/api/contact/:contactId', contactController.update)
userRouter.delete('/api/contact/:contactId', contactController.remove)
userRouter.get('/api/contacts', contactController.search)

export {
    userRouter
}
