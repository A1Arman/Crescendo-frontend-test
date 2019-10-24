import React, { Component } from 'react';
import recipeAPI from '../../apis/recipes';
import ValidationError from '../ValidationError/ValidationError';
import AddIngredients from '../AddIngredients/AddIngredients';
import moment from 'moment';
import AddDirections from '../AddDirections/AddDirections';
import { RecipeContext } from '../../context/recipe-context';
import './AddRecipe.css';


class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            servings: null,
            prepTime: null,
            cookTime: null,
            ingredients: [],
            directions: [],
            titleValid: false,
            descriptionValid: false,
            servingsValid: false,
            prepTimeValid: false,
            cookTimeValid: false,
            ingredientsValid: false,
            directionsValid: false,
            isShowingIngredients: false,
            isShowingDirections: false,
            formValid: false,
            ingredientMessage: '',
            directionMessage: '',
            validationMessages: {
                title: '',
                description: '',
                servings: '',
                cookTime: '',
                prepTime: ''
            }
        }

        this.baseState = this.state;
    }

    handleAddRecipeSubmit = (event) => {
        event.preventDefault();
        const recipe = {
            uuid: this.getUUID(),
            title: this.state.title,
            description: this.state.description,
            servings: this.state.servings,
            prepTime: this.state.prepTime,
            cookTime: this.state.cookTime,
            postDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            editDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            ingredients: this.state.ingredients,
            directions: this.state.directions
        }
        this.context.addRecipe(recipe)
        this.handleAddRecipe(recipe)
    }

    handleAddRecipe = async (recipe) => {
        await recipeAPI.post('/recipes', recipe);
        this.setState(this.baseState);
        const form = document.getElementById('addRecipeForm');
        form.reset();
        this.props.history.push('/recipes')
    }

    formValid() {
        this.setState({
            formValid: this.state.titleValid && this.state.descriptionValid && this.state.servingsValid && this.state.prepTimeValid && this.state.cookTimeValid && this.state.ingredientsValid && this.state.directionsValid
        })
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

    handleIngredientsSubmit = (event) => {
        event.preventDefault();
        const ingredient = {
            uuid: this.getUUID(),
            name: event.target.ingredientName.value,
            amount: event.target.amount.value,
            measurement: event.target.measurement.value
        }
        this.setState({ ingredients: [...this.state.ingredients, ingredient], ingredientMessage: `Added ${ingredient.name}`, ingredientsValid: true}, this.formValid)
        const form = document.getElementById('ingredientsForm')
        form.reset();
    }

    handleAddDirection = (event) => {
        event.preventDefault();
        const direction = {
            instructions: event.target.instructions.value,
            optional: event.target.optional.value
        }
        this.setState({ directions: [...this.state.directions, direction], directionMessage: `Added ${direction.instructions}`, directionsValid: true}, this.formValid)
        const form = document.getElementById('addDirectionForm')
        form.reset();
    }

    getUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    validateTitle(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.title = 'Title is required';
        hasError = true;
        } else {
        fieldErrors.title = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        titleValid: !hasError
        }, this.formValid);
    }

    validateDescription(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.description = 'Description is required';
        hasError = true;
        } else {
        fieldErrors.description = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        descriptionValid: !hasError
        }, this.formValid);
    }

    validateServings(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue <= 0 || fieldValue >= 1000000) {
        fieldErrors.servings = 'Must be Greater than 0 and less that 1,000,000';
        hasError = true;
        } else {
        fieldErrors.servings = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        servingsValid: !hasError
        }, this.formValid);
    }

    validateCookTime(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue <= 0 || fieldValue >= 1000000) {
        fieldErrors.cookTime = 'Must be Greater than 0 and less that 1,000,000';
        hasError = true;
        } else {
        fieldErrors.cookTime = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        cookTimeValid: !hasError
        }, this.formValid);
    }

    validatePrepTime(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue <= 0 || fieldValue >= 1000000) {
        fieldErrors.prepTime = 'Must be Greater than 0 and less that 1,000,000';
        hasError = true;
        } else {
        fieldErrors.prepTime = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        prepTimeValid: !hasError
        }, this.formValid);
    }

    updateTitle(title) {
        this.setState({title}, () => {this.validateTitle(title)});
    }

    updateDescription(description) {
        this.setState({description}, () => {this.validateDescription(description)});
    }

    updateServings(servings) {
        this.setState({servings}, () => {this.validateServings(servings)});
    }

    updateCookTime(cookTime) {
        this.setState({cookTime}, () => {this.validateCookTime(cookTime)});
    }

    updatePrepTime(prepTime) {
        this.setState({prepTime}, () => {this.validatePrepTime(prepTime)});
    }


    render() {
        return (
            <div>
                {this.state.isShowingDirections || this.state.isShowingIngredients ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null  }
                {this.state.isShowingIngredients ? <AddIngredients className='modal' message={this.state.ingredientMessage} handleAddIngredient={(event) => this.handleIngredientsSubmit(event)}  show={this.state.isShowingIngredients} close={this.closeModalHandler}/> : null}
                {this.state.isShowingDirections ? <AddDirections className='modal' message={this.state.directionMessage}  handleAddDirection={(event) => this.handleAddDirection(event)} show={this.state.isShowingDirections} close={this.closeModalHandler} /> : null}
                <h2 className='page__header--add'>Add Recipe</h2>
                <form id='addRecipeForm' className='addRecipeForm' onSubmit={this.handleAddRecipeSubmit}>
                    <div className='addRecipeForm__container'>
                        <label className='addRecipeForm__label' htmlFor='addRecipeForm__title'>Title:</label>
                        <input className='addRecipeForm__input' placeholder='Title' type='text' name='title' id='addRecipeForm__title' onChange={e => this.updateTitle(e.target.value)} required/>
                        <ValidationError hasError={!this.state.titleValid} message={this.state.validationMessages.title} />
                    </div>
                    <div className='addRecipeForm__container'>
                        <label className='addRecipeForm__label' htmlFor='addRecipeForm__description'>Description:</label>
                        <input className='addRecipeForm__input' placeholder='Description' type='text' name='description' id='addRecipeForm__description' onChange={e => this.updateDescription(e.target.value)} required/>
                        <ValidationError hasError={!this.state.descriptionValid} message={this.state.validationMessages.description} />
                    </div>
                    <div className='addRecipeForm__container'>
                        <label className='addRecipeForm__label' htmlFor='addRecipeForm__servings'>Servings:</label>
                        <input className='addRecipeForm__input' placeholder='Servings' type='number' min='0' max='1,000,000' name='servings' id='addRecipeForm__servings' onChange={e => this.updateServings(e.target.value)} required/>
                        <ValidationError hasError={!this.state.servingsValid} message={this.state.validationMessages.servings} />
                    </div>
                    <div className='addRecipeForm__container'>
                        <label className='addRecipeForm__label' htmlFor='addRecipeForm__cookTime'>Cook Time:</label>
                        <input className='addRecipeForm__input' placeholder='Cook Time' type='number' min='0' max='1,000,000' name='cookTime' id='addRecipeForm__cookTime' onChange={e => this.updateCookTime(e.target.value)} required/>
                        <ValidationError hasError={!this.state.cookTimeValid} message={this.state.validationMessages.cookTime} />
                    </div>
                    <div className='addRecipeForm__container'>
                        <label className='addRecipeForm__label' htmlFor='addRecipeForm__prepTime'>Prep Time:</label>
                        <input className='addRecipeForm__input' placeholder='Prep Time' type='number' min='0' max='1,000,000' name='prepTime' id='addRecipeForm__prepTime' onChange={e => this.updatePrepTime(e.target.value)} required/>
                        <ValidationError hasError={!this.state.prepTimeValid} message={this.state.validationMessages.prepTime} />
                    </div>
                    <div className='addRecipeForm__container--update'>
                        <div className='addRecipeForm__container'>
                            <button className='addRecipeForm__btn' type='button' onClick={this.openIngredientsModal}>Add Ingredients</button>
                        </div>
                        <div className='addRecipeForm__container'>
                            <button className='addRecipeForm__btn' type='button' onClick={this.openDirectionsModal}>Add Directions</button>
                        </div>
                    </div>
                    <div className='addRecipeForm__subBtnContainer'>
                        <button className={!this.state.formValid ? 'addRecipeForm__btn--submit red' : 'addRecipeForm__btn--submit green'} type='submit' disabled={!this.state.formValid}>Add Recipe</button>
                    </div>
                </form>
                <div>
                    <p>{this.state.responseText}</p>
                </div>
            </div>
        );
    }
};

AddRecipe.contextType = RecipeContext
export default AddRecipe;