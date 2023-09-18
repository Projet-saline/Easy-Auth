import { RequestHandler } from "express";
import User from "../models/user";


console.log(User);

const getAll : RequestHandler = async (req, res) => {
    if (!User) {
        return res.status(500).json({ message: "Le modèle User n'est pas défini" });
    }

    try {
        const allUsers = await User.findAll();
        return res.status(200).json({ message: "Liste des utilisateurs", data: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur est survenue" });
    }
};

const getOne : RequestHandler = async (req, res) => {
    const {id } = req.params;
    const oneUser = await User.findByPk(id);
    return res
        .status(200)
        .json({message: "Utilisateur", data: oneUser});
};

// Peut-être en doublon avec signupRoute.ts
// const createOne : RequestHandler = async (req, res) => {
//     const createdUser = await User.create(req.body);
//     return res
//         .status(201)
//         .json({message: "Utilisateur créé avec succès !", data: createdUser});
// };



const updateOne : RequestHandler = async (req, res) => {
    const {id } = req.params;
    const updatedUser = await User.update(req.body, {where: {id}});
    return res
        .status(200)
        .json({message: "Utilisateur modifié avec succès !", data: updatedUser});
};

const deleteOne : RequestHandler = async (req, res) => {
    // const {id } = req.params;
    // const deletedUser = User|null = await User.findByPk(id);

    const deletedUser = await User.destroy({where: {id: req.params.id}});
    return res
        .status(200)
        .json({message: "Utilisateur supprimé avec succès !", data: deletedUser});
};

// Doublon, j'ai retiré createOne de la liste des routes
export { getAll, getOne, updateOne, deleteOne };