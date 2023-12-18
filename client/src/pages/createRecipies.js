import { useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipies = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const userId = useGetUserID();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: "",
        imageUrl: "",
        ingredients: [],
        instructions: "",
        createdBy: userId,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };

    const handleIngredientChange = (event, i) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[i] = value;
        setRecipe({ ...recipe, ingredients: ingredients });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipies", recipe,
                { headers: { authorization: cookies.access_token } });
            alert("Recipe created");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='create-Recipies'>
            <h2>Create Your Recipies here</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} />

                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />

                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, i) => (
                    <input
                        key={i}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(event) => handleIngredientChange(event, i)} />
                ))}
                <button onClick={addIngredient} type="button">Add Ingredient</button>


                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                <button type="submit">Add Recipe</button>

            </form>
        </div >
    )
}

export default CreateRecipies;
