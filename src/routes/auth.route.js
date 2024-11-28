import express, { Router } from "express"

const router = express.Router()

import {signup,login,logout} from '../controllers/aut.controller.js'

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
// router.put('/updated-profile',protectRoute,updatedProfile)


export default router