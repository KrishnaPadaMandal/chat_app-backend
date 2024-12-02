import express, { Router } from "express"

const router = express.Router()

import {signup,login,logout,updatedProfile,checkAuth} from '../controllers/aut.controller.js'
import {createMessage,messageList} from '../controllers/message.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
router.put('/updated-profile',protectRoute,updatedProfile)
router.get('/check',protectRoute,checkAuth)


router.post("/message",createMessage)

router.get('/message-list/:sender_id',messageList)


export default router