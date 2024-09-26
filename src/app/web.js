import express from "express"
import { publicRouter } from "../route/publicApi.js"
import { errorMiddlware } from "../middleware/errorMiddleware.js"
import { userRouter } from "../route/api.js"

export const web = express()
web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddlware)
