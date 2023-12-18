import { useEffect, useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';
import { useCookies } from "react-cookie";

const Home = () => {
    const [recipies, setRecipies] = useState([]);
    const [savedRecipies, setSavedRecipies] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipies");
                setRecipies(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipies/readRecipies/ids/${userID}`);
                // console.log(response.data);
                setSavedRecipies(response.data.savedRecipies);
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
            console.log("Attempting to save recipe with ID:", recipeID);
            const response = await axios.put("http://localhost:3001/recipies",
                { recipeID, userID },
                { headers: { authorization: cookies.access_token } }
            );
            console.log("Backend response:", response.data.savedRecipies);
            setSavedRecipies(response.data.savedRecipies);
        } catch (error) {
            console.log(error);
        }
    };

    const isRecipeSaved = (id) => savedRecipies?.includes(id) ?? false;

    return (
        <div>
            <h2>Recipies</h2>
            <ul>
                {recipies.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
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
