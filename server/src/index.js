import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from '../routes/users.js';
import { recipeRouter } from "../routes/recipies.js";
import dotenv from "dotenv";
// import connectToMongoDB from "./db/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipies", recipeRouter);



// (async => {
//     try {
//         await mongoose.connect(`${mongoURL}`)
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// }
// );

const portNumber = process.env.PORT;
console.log(`PORT NO: ${portNumber}`);
(async () => {
    try {
        console.log("MONGO_URL:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/RecipeApp');
        console.log(`Connected to MongoDB`);
        app.listen(process.env.PORT, () => console.log(`Server started at ${process.env.PORT} for Recipies`));
    } catch (error) {
        console.log("MongoDB connection Error: ", error);
    }
})();
