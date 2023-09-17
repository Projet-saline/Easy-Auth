import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import User from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
// import { where } from "sequelize";

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

        const user = User.build({email, password, username});
        await user.save();

        res.status(201).send(user);
    });

// Il y a plusieurs façons de valider les données d'un utilisateur.
// Ici, on utilise express-validator pour valider les données du corps de la requête (body).
// Pour l'utiliser, il faut l'installer avec npm install express-validator
// et l'importer avec import { body } from 'express-validator';
// Ensuite, on va l'utiliser comme un middleware dans la route signup.
// On va lui passer un tableau d'objets qui vont décrire les validations à effectuer.
// Dans les crochets, on va passer un objet pour chaque champ qu'on veut valider => on va lister les étapes de validation de ca tableau.
// validationResults() est une fonction qui va vérifier la requête entrante à l'intérieur de notre gestionnaire de requête à chaque fois que nous exécutons le résultat.
// Et elle va inspecter la requête et extraire toutes les informations.

export { router as signupRouter };