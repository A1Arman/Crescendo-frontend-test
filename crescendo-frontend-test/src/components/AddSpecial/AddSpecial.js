import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import specialsAPI from '../../apis/specials';
import { SpecialsContext } from '../../context/specials-context';
import './AddSpecial.css';

class AddSpecial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UUID: null,
            ingredientId: '',
            ingredientName: '',
            type: '',
            title: '',
            text: '',
            latitude: null,
            longitude: null,
            typeValid: false,
            titleValid: false,
            nameValid: false,
            formValid: false,
            latitudeValid: false,
            longitudeValid: false,
            validationMessages: {
                title: '',
                type: '',
                name: '',
                latitude: '',
                longitude: ''
            }
        }

        this.baseState = this.state;
    }

    formValid() {
        this.setState({
            formValid: this.state.titleValid && this.state.typeValid && this.state.nameValid && this.state.latitudeValid && this.state.longitudeValid
        })
    }

    handleAddSpecialSubmit = (event) => {
        event.preventDefault();
        const geo = `${this.state.latitude},${this.state.longitude}`;
        const special = {
            uuid: this.getUUID(),
            ingredientId: this.state.ingredientId,
            type: this.state.type,
            title: this.state.title,
            geo,
            text: this.state.text
        }
        this.handleAddSpecial(special);
        this.context.addSpecial(special);
    }

    handleAddSpecial = (special) => {
        if (this.state.ingredientId !== '') {
            specialsAPI.post('/specials', special);
            const form = document.getElementById('addSpecialForm');
            form.reset();
            this.setState(this.baseState);
            this.props.history.push('/specials');
        }
    }

    getIngredientId = () => {
       this.context.recipes.map(recipe => {
           recipe.ingredients.map(ingredient => {
               if (ingredient.name === this.state.ingredientName) {
                   this.setState({ ingredientId: ingredient.uuid})
               } else {
                   const ingredientId = this.getUUID();
                   this.setState({ ingredientId })
               }
           })
       })
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

    validateType(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.type = 'Type is required';
        hasError = true;
        } else {
        fieldErrors.type = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        typeValid: !hasError
        }, this.formValid);
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.name = 'Name is required';
        hasError = true;
        } else {
        fieldErrors.name = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        nameValid: !hasError
        }, this.formValid);
    }

    validateLongitude(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue < -180 || fieldValue > 180) {
        fieldErrors.longitude = 'Must be Greater than -180 and less than 180';
        hasError = true;
        } else {
        fieldErrors.longitude = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        longitudeValid: !hasError
        }, this.formValid);
    }

    validateLatitude(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue < -90 || fieldValue > 90) {
        fieldErrors.latitude = 'Must be Greater than -90 and less than 90';
        hasError = true;
        } else {
        fieldErrors.latitude = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        latitudeValid: !hasError
        }, this.formValid);
    }

    updateTitle(title) {
        this.setState({title}, () => {this.validateTitle(title)});
    }

    updateType(type) {
        this.setState({type}, () => {this.validateType(type)});
    }

    updateName(name) {
        this.setState({ingredientName: name}, () => {this.validateName(name)});
    }

    updateText(text) {
        this.setState({text});
    }

    updateLatitude(latitude) {
        this.setState({latitude}, () => {this.validateLatitude(latitude)});
    }

    updateLongitude(longitude) {
        this.setState({longitude}, () => {this.validateLongitude(longitude)});
    }

    render() {
        return (
            <div>
                <h2 className='page__header--add'>Add Special</h2>
                <form id='addSpecialForm' className='addSpecialForm' onSubmit={this.handleAddSpecialSubmit}>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_title'>Title:</label>
                        <input className='addSpecialForm__input' placeholder='Title' type='text' name='title' id='addSpecialForm__title' onChange={e => this.updateTitle(e.target.value)} required/>
                        <ValidationError hasError={!this.state.titleValid} message={this.state.validationMessages.title} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_type'>Type:</label>
                        <input className='addSpecialForm__input' placeholder='Type' type='text' name='type' id='addSpecialForm__type' onChange={e => this.updateType(e.target.value)} required/>
                        <ValidationError hasError={!this.state.typeValid} message={this.state.validationMessages.type} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_name'>Ingredient Name:</label>
                        <input className='addSpecialForm__input' placeholder='Name' type='text' name='type' id='addSpecialForm__name' onChange={e => this.updateName(e.target.value)} required/>
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_text'>Text:</label>
                        <input className='addSpecialForm__input' placeholder='Text' type='text' name='text' id='addSpecialForm__text' onChange={e => this.updateText(e.target.value)} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_Latitude'>Latitude:</label>
                        <input className='addSpecialForm__input' placeholder='Latitude Location' type='number' min='-90' max='90' name='latitude' id='addSpecialForm__Latitude' onChange={e => this.updateLatitude(e.target.value)} />
                        <ValidationError hasError={!this.state.latitudeValid} message={this.state.validationMessages.latitude} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <label className='addSpecialForm__label' htmlFor='addSpecialForm_Longitude'>Longitude:</label>
                        <input className='addSpecialForm__input' placeholder='Longitude Location' type='number' min='-180' max='180' name='longitude' id='addSpecialForm__Longitude' onChange={e => this.updateLongitude(e.target.value)} />
                        <ValidationError hasError={!this.state.longitudeValid} message={this.state.validationMessages.longitude} />
                    </div>
                    <div className='addSpecialForm__container'>
                        <button className={!this.state.formValid ? 'addSpecialForm__btn red' : 'addSpecialForm__btn green'} onClick={this.getIngredientId} disabled={!this.state.formValid} type='submit'>Add Special</button>
                    </div>
                </form>
            </div>
        );
    }
};

AddSpecial.contextType = SpecialsContext;
export default AddSpecial;