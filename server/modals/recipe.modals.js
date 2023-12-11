import mongoose from "mongoose";

// Define the Recipe Schema
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: String,
            required: true
        },
    ],
    instructions: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
});

export const RecipeModal = mongoose.model('recipes', RecipeSchema);

// module.exports = RecipeModal;
