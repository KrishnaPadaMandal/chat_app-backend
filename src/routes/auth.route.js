import express, { Router } from "express"

const router = express.Router()

import {signup,login,logout} from '../controllers/aut.controller.js'
import {createMessage,messageList} from '../controllers/message.controller.js'

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
// router.put('/updated-profile',protectRoute,updatedProfile)


router.post("/message",createMessage)

router.get('/message-list/:sender_id',messageList)


export default router