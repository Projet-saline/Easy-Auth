import express, { Request, Response } from "express";
import { getAll, getOne, updateOne, deleteOne } from "../controllers/userController";

const router = express.Router();

router.get('/api/users/getAll', getAll);
router.get('/api/users/getOne/:id', getOne)
router.put('/api/users/update/:id', updateOne);
router.delete('/api/users/delete/:id', deleteOne);

export { router as userRouter };

