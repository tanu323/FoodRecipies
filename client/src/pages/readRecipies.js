import { useState, useEffect } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';

const
    ReadRecipies = () => {
        const [savedRecipies, setSavedRecipies] = useState([]);
        const userID = useGetUserID();

        useEffect(() => {
            const fetchSavedRecipe = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/recipies/readRecipies/${userID}`);
                    console.log("saved recipe: ", response.data.savedRecipies);
                    if (response.data && response.data.savedRecipies) {
                        setSavedRecipies(response.data.savedRecipies);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchSavedRecipe();
        }, []);

        return (
            <div>
                <h2>Your Bookmarked Recipies</h2>
                <ul>
                    {savedRecipies.map((recipe) => (
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>
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
        );
    };

export default ReadRecipies;

