import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from '../routes/users.js';
import { recipeRouter } from "../routes/recipies.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipies", recipeRouter);

mongoose.connect("mongodb+srv://TanuChauhan:05520902816@recipe.2ruqsvr.mongodb.net/recipes?retryWrites=true&w=majority");

app.listen(3001, () => console.log("Server started at port 3001 for Recipies"));