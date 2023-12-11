import { useEffect, useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';
import { useCookies } from "react-cookie";

const Home = () => {
    const [recipes, setRecipies] = useState([]);
    const [savedRecipes, setSavedRecipies] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userId = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipies(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/readRecipies/ids/${userId}`);
                setSavedRecipies(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipe();
        if (cookies.access_token)
            fetchSavedRecipe();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes",
                { recipeID, userId },
                { headers: { authorization: window.localStorage.getItem("access_token") } }
            );
            console.log(response.data.savedRecipes);
            setSavedRecipies(response.data.savedRecipes);
        } catch (error) {
            console.log(error);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h2>Recipies</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button
                                onClick={() => saveRecipe(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className='instructions'>
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Created By: {recipe.createdBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;
