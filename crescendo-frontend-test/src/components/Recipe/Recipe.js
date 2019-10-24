import React from 'react';
import { RecipeContextConsumer } from '../../context/recipe-context';
import { Link } from 'react-router-dom';
import './Recipe.css'

function findSpecialIngredient(specials) {
    return specials.map(special => special.ingredientId)
}

function Recipe(props) {
    const { match: { params } } = props
    return (
        <div>
            <RecipeContextConsumer>
            {({ recipes, specials }) => {
                    return recipes && specials ? recipes.map(recipe => {
                        if (recipe.uuid === params.uuid) {
                            return (
                                <div className='recipe__container--main' key={recipe.uuid}>
                                    <h1 className='page__header--recipe'>Recipe</h1>
                                    <div className='recipe__container--general'>
                                        <h2 className='recipe__title'>{recipe.title}</h2>
                                        <Link className='btn recipe__updateBtn' to={`/recipes/updateRecipe/${recipe.uuid}`}>Update Recipe</Link>
                                        <div className='recipe__imageContainer'>
                                            {recipe.images ? <img className='recipe__image' src={`http://localhost:3001${recipe.images.medium}`} alt={`${recipe.title}`} title={`${recipe.title}`}></img> : ''}
                                        </div>
                                        <p className='recipe__description'>{recipe.description}</p>
                                        <p className='recipe__detail'>Cook Time: <span className='recipe__bold'>{recipe.cookTime}mins </span></p>
                                        <p className='recipe__detail'>Prep Time: <span className='recipe__bold'>{recipe.prepTime} mins</span></p>
                                        <p className='recipe__detail'>Total Time: <span className='recipe__bold'>{JSON.parse(recipe.prepTime) + JSON.parse(recipe.cookTime)} mins</span></p>
                                        <p className='recipe__detail'>Yield: <span className='recipe__bold'>{recipe.servings} servings</span></p>
                                    </div>
                                    <div className='recipe__container--ingredients'>
                                        <h3 className='recipe__container--title'>Ingredients:</h3>
                                            {recipe.ingredients.map(ingredient => {
                                                const specialIngredients = findSpecialIngredient(specials)
                                                let specialIngredientIndex = specialIngredients.indexOf(ingredient.uuid);
                                                return specialIngredientIndex !== -1 ?
                                                <div className='recipe__ingredients' key={ingredient.uuid}>
                                                    <div className='recipe__ingredient--content'>
                                                        <p className='recipe__ingredient--name'>{ingredient.name}</p>
                                                        <p>{ingredient.amount} {ingredient.measurement} </p>
                                                    </div>
                                                    <div className='recipe__ingredient--special'>
                                                        <p>Special: {specials[specialIngredientIndex].title} <span>{specials[specialIngredientIndex].type}</span></p>
                                                        <div dangerouslySetInnerHTML={{ __html: specials[specialIngredientIndex].text}} />
                                                    </div>
                                                </div>
                                                :
                                                <div className='recipe__ingredients recipe__ingredient--content' key={ingredient.uuid}>
                                                    <p className='recipe__ingredient--name'>{ingredient.name}</p>
                                                    <p>{ingredient.amount} {ingredient.measurement}</p>
                                                </div>
                                            })}
                                    </div>
                                    <div className='recipe__container--directions'>
                                        <h3 className='recipe__container--title'>Directions: </h3>
                                        {recipe.directions.map((direction, index) => {
                                            return (
                                                <div className='recipe__directions' key={index}>
                                                    <h4 className='recipe__direction--index'>{index + 1}</h4>
                                                    <p className='recipe__direction--content'>{direction.instructions}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                }) : 'Loading'
            }}
            </RecipeContextConsumer>
        </div>
    );
};

export default Recipe;