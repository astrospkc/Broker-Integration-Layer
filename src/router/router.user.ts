import express from 'express';
import User from '../models/models.user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import authMiddleware from '../middleware/middleware.auth';
const router = express.Router()

const JWTSECRET = process.env.JWT_SECRET ?? ""
const createUser = async (req: express.Request, res: express.Response) => {
    try {
        let success = false
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ "error": "User already exists , login instead" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = await User.create({ name, email, password: hashedPassword })
        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        }
        const authToken = jwt.sign(data, JWTSECRET)
        success = true
        res.status(201).send({ "success": success, "token": authToken, "user": user })
    } catch (error) {
        res.status(500).send({ "error": error, "message": "Internal error occured while creating user" })
    }
}

const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({ "error": "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({ "error": "Invalid credentials" })
        }
        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        }
        const authToken = jwt.sign(data, JWTSECRET)
        res.status(200).send({ "success": true, "token": authToken, "user": user })
    } catch (error) {
        res.status(500).send({ "error": error, "message": "Internal error occured while logging in user" })
    }
}

const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        res.status(200).send({ "success": true, "user": user })
    } catch (error) {
        res.status(500).send({ "error": error, "message": "Internal error occured while getting user" })
    }
}


router.post("/createuser", createUser)
router.post("/login", login)
router.get("/getuser", authMiddleware, getUser)
export default router