import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import User from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { PasswordUtils} from "../utils/passwordUtils";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Votre email doit être valide')
            .notEmpty()
            .withMessage('Votre email ne peut pas être vide'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Votre mot de passe doit être compris entre 4 et 20 caractères')
            .notEmpty()
            .withMessage('Votre mot de passe ne peut pas être vide'),
        body('username')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('Votre nom d\'utilisateur doit être compris entre 2 et 20 caractères')
            .notEmpty()
            .withMessage('Votre nom d\'utilisateur ne peut pas être vide')
    ],
    async (req : Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ where: { email }});

        if (existingUser) {
            throw new BadRequestError('Email déjà utilisé');
        }

        const existingUsername = await User.findOne({ where: { username }});

        if (existingUsername) {
            throw new BadRequestError('Nom d\'utilisateur déjà utilisé');
        }

        // Password hashed and create user in database
        const hashedPassword = await PasswordUtils.hashPassword(password);
        const user = User.build({email, password: hashedPassword, username});
        await user.save();

        // Generate JWT
        // const  userJwt = jwt.sign({
        //         id: user.idUser,
        //         email: user.email
        //     },
        //     process.env.JWT_KEY
        // );

        // Store it on session object
        // req.session = {
        //     userJwt
        // };

        res.status(201).send(user);
    });

export { router as signupRouter };