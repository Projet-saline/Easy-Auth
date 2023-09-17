import express, { Request, Response } from "express";
import { getAll, getOne, updateOne, deleteOne } from "../controllers/userController";
// J'ai retiré createOne de la liste des routes

const router = express.Router();

router.get('/api/users/getAll', getAll);
router.get('/api/users/getOne/:id', getOne)
// À voir si on garde cette route. À cause du doucblon avec signupRoute.ts
// router.post('/api/users/createOne', createOne);
router.put('/api/users/update/:id', updateOne);
router.delete('/api/users/delete/:id', deleteOne);

export { router as userRouter };

