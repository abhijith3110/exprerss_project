import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controller/controller.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get('/user/:id', getUser);
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



export default router; 
