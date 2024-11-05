import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controller/controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get('/user/:id', getUser);
router.post('/create', upload.array('files',3), createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



export default router; 
