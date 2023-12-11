import { useState, useEffect } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID.js';

const
    ReadRecipies = () => {
        const [savedrecipes, setSavedRecipies] = useState([]);
        const userId = useGetUserID();

        useEffect(() => {
            const fetchSavedRecipe = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/readRecipies/${userId}`);
                    setSavedRecipies(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchSavedRecipe();
        }, []);

        return (
            <div>
                <h2>Your Recipies</h2>
                <ul>
                    {savedrecipes.map((recipe) => (
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

