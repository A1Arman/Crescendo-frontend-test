import React from 'react';
import { RecipeContextConsumer } from '../../context/recipe-context';
import { Link } from 'react-router-dom';
import './RecipeList.css'

function RecipesList(props) {
    return (
        <div className='recipeList__wrapper'>
            <h1 className='page__header--list'>Recipes</h1>
            <Link to='/recipes/addRecipe' className='btn btn--add'>+</Link>
            <div className='recipeList__container--main'>
                <RecipeContextConsumer>
                {({ recipes }) => {
                        return recipes ? recipes.map(recipe => {
                        return recipe.images ? 
                            <div className='recipeList__container' key={recipe.uuid}>
                                    <div className='recipeList__imageContainer'>
                                        <img className='recipeList__image' src={`http://localhost:3001${recipe.images.medium}`} alt={`${recipe.title}`} title={`${recipe.title}`}></img>
                                    </div>
                                    <div className='recipeList__content'>
                                        <h2 className='recipeList__title--secondary'>{recipe.title}</h2>
                                        <p className='recipeList__description'>{recipe.description}</p>
                                        <Link className='btn recipeList__btn' to={`/recipes/${recipe.uuid}`}>Details</Link>
                                    </div>
                            </div>
                        :
                            <div className='recipeList__container' key={recipe.uuid}>
                                    <div className='recipeList__imageContainer'>
                                    </div>
                                    <div className='recipeList__content'>
                                        <h2 className='recipeList__title--secondary'>{recipe.title}</h2>
                                        <p className='recipeList__description'>{recipe.description}</p>
                                        <Link className='btn recipeList__btn' to={`/recipes/${recipe.uuid}`}>Details</Link>
                                    </div>
                            </div>
                    }) : 'Loading'
                }}
                </RecipeContextConsumer>
            </div>
        </div>
    );
}

export default RecipesList;