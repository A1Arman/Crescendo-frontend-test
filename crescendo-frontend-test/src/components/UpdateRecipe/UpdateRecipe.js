import React, { Component } from 'react';
import { RecipeContextConsumer, RecipeContext } from '../../context/recipe-context';
import moment from 'moment';
import recipeAPI from '../../apis/recipes';
import AddDirections from '../AddDirections/AddDirections';
import AddIngredients from '../AddIngredients/AddIngredients';
import './UpdateRecipe.css';


class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: props.match.params.uuid,
            isShowingDirections: false,
            isShowingIngredients: false,
            ingredientUUID: null,
            formValid: false,
            ingredientMessage: '',
            directionMessage: '',
            ingredients: [],
            directions: [],
        }

        this.baseState = this.state;
    }

    componentDidMount() {
        if (this.context.recipes !== null) {
            this.context.recipes.map(recipe => {
                if (recipe.uuid === this.state.recipeId) {
                    this.setState({ ingredients: recipe.ingredients, directions: recipe.directions})
                }
            })
        }
    }

    updateRecipeSubmit = (event) => {
        event.preventDefault();
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');

        const recipe = {
            title: event.target.title.value,
            description: event.target.description.value,
            servings: event.target.servings.value,
            cookTime: event.target.cookTime.value,
            prepTime: event.target.prepTime.value,
            editDate: date,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        }
        this.context.updateRecipe(this.state.recipeId, recipe);
        this.updateRecipe(recipe);
    }

    updateRecipe = async (recipe) => {
        await recipeAPI.patch(`/recipes/${this.state.recipeId}`, recipe);
        this.setState(this.baseState);
        const form = document.getElementById('updateRecipeForm')
        form.reset();
        this.props.history.push(`/recipes/${this.state.recipeId}`);
    }

    handleIngredientsSubmit = (event) => {
        event.preventDefault();

        const ingredient = {
            uuid: this.getUUID(),
            name: event.target.ingredientName.value,
            amount: event.target.amount.value,
            measurement: event.target.measurement.value
        }
        
        this.setState({ ingredients: [...this.state.ingredients, ingredient], ingredientMessage: `Added ${ingredient.name}`})
        const form = document.getElementById('ingredientsForm')
        form.reset();
    }

    handleAddDirection = (event) => {
        event.preventDefault();
        const direction = {
            instructions: event.target.instructions.value,
            optional: event.target.optional.value
        }
        this.setState({ directions: [...this.state.directions, direction], directionMessage: `Added ${direction.instructions}`})
        const form = document.getElementById('addDirectionForm')
        form.reset();
    }

    formValid() {
        this.setState({
            formValid: this.state.titleValid && this.state.descriptionValid && this.state.servingsValid && this.state.prepTimeValid && this.state.cookTimeValid && this.state.ingredientsValid && this.state.directionsValid
        })
    }

    handleIngredientClick = () => {
        this.openIngredientsModal();
    }

    getUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    closeModalHandler = () => {
        return this.state.isShowingDirections || this.state.isShowingIngredients ?
            this.setState({ isShowingDirections: false, isShowingIngredients: false }) : null
    }

    openIngredientsModal = () => {
        this.setState({isShowingIngredients: true})
    }

    openDirectionsModal = () => {
        this.setState({isShowingDirections: true})
    }
    
    render() {
        return (
            <div>
                <RecipeContextConsumer>
                    {({ recipes }) => {
                        return recipes ? recipes.map(recipe => {
                            if (recipe.uuid === this.state.recipeId) {
                                return (
                                    <div className='recipe__updateFormContainer--main' key={recipe.uuid}>
                                        {this.state.isShowingDirections || this.state.isShowingIngredients ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null  }
                                        {this.state.isShowingIngredients ? <AddIngredients className='modal' message={this.state.ingredientMessage} handleAddIngredient={(event) => this.handleIngredientsSubmit(event)}  show={this.state.isShowingIngredients} close={this.closeModalHandler}/> : null}
                                        {this.state.isShowingDirections ? <AddDirections className='modal' message={this.state.directionMessage}  handleAddDirection={(event) => this.handleAddDirection(event)} show={this.state.isShowingDirections} close={this.closeModalHandler} /> : null}
                                        <form id='updateRecipeForm' className='updateRecipeForm' onSubmit={this.updateRecipeSubmit}>
                                            <h2 className='page__header'>Update Recipe</h2>
                                            <div className='updateRecipeForm__container'>
                                                <label className='updateRecipeForm__label' htmlFor='updateRecipeForm__title'>Title:</label>
                                                <input className='updateRecipeForm__input' type='text' name='title' id='updateRecipeForm__title' defaultValue={recipe.title} required/>
                                            </div>
                                            <div className='updateRecipeForm__container'>
                                                <label className='updateRecipeForm__label' htmlFor='updateRecipeForm__description'>Description:</label>
                                                <input className='updateRecipeForm__input' type='text' name='description' id='updateRecipeForm__description' defaultValue={recipe.description} required/>
                                            </div>
                                            <div className='updateRecipeForm__container'>
                                                <label className='updateRecipeForm__label' htmlFor='updateRecipeForm__servings'>Servings:</label>
                                                <input className='updateRecipeForm__input' type='number' name='servings' min='0' max='1000000' id='updateRecipeForm__servings' defaultValue={recipe.servings} required/>
                                            </div>
                                            <div className='updateRecipeForm__container'>
                                                <label className='updateRecipeForm__label' htmlFor='updateRecipeForm__cookTime'>Cook Time:</label>
                                                <input className='updateRecipeForm__input' type='number' name='cookTime' min='0' max='1000000' id='updateRecipeForm__cookTime' defaultValue={recipe.cookTime} required/>
                                            </div>
                                            <div className='updateRecipeForm__container'>
                                                <label className='updateRecipeForm__label' htmlFor='updateRecipeForm__prepTime'>Prep Time:</label>
                                                <input className='updateRecipeForm__input' type='number' name='prepTime' min='0' max='1000000' id='updateRecipeForm__prepTime' defaultValue={recipe.prepTime} required/>
                                            </div>
                                            <div className='updateRecipeForm__container--update'>
                                                <div className='updateRecipeForm__container'>
                                                    <button className='udpateRecipeForm__btn' type='button' onClick={this.handleIngredientClick}>Add Ingredients</button>
                                                </div>
                                                <div className='updateRecipeForm__container'>
                                                    <button className='udpateRecipeForm__btn' type='button' onClick={this.openDirectionsModal}>Add Directions</button>
                                                </div>
                                            </div>
                                            <div className='updateRecipeForm__container'>
                                                <button className='udpateRecipeForm__btn' type='submit'>Update Recipe</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                        })
                        :
                        null
                    }}
                </RecipeContextConsumer>
            </div>
        );
    }  
}

UpdateRecipe.contextType = RecipeContext;
export default UpdateRecipe;