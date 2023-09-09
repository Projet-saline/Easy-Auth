import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Votre email doit être valide'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Votre mot de passe doit être compris entre 4 et 20 caractères')
    ],
    (req : Request, res: Response) => {
        const { email, password } = req.body;

        if(!email || typeof email !== 'string') {
            return res.status(400).send('Fournissez un email valide, svp');
        }

        // new User({ email, password });
    });

export { router as signupRouter };