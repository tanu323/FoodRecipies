import express from "express";
import { RecipeModal } from "../modals/recipe.modals.js";
import { UserModal } from "../modals/user.modals.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModal.find({});
        // console.log(response);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModal(req.body);
    try {
        const response = await recipe.save();
        console.log(response);
        res.json(response);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModal.findById(req.body.recipeID);
        const user = await UserModal.findById(req.body.userID);
        user.savedRecipies.push(recipe);
        await user.save();
        res.json({ savedRecipies: user?.savedRecipies });
    } catch (err) {
        res.json(err);
    }
});

router.get("/readRecipies/ids/:userID", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.userID);
        res.json({ savedRecipies: user?.savedRecipies });
    } catch (error) {
        res.json(error);
    }
});

router.get("/readRecipies/:userID", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.userID);
        const savedRecipies = await RecipeModal.find({
            _id: { $in: user.savedRecipies },
        })
        res.json({ savedRecipies });
    } catch (error) {
        res.json(error);
    }
});

export { router as recipeRouter };
