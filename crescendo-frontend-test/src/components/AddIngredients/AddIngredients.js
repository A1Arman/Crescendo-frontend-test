import React from 'react';
import './AddIngredients.css';


function AddIngredients(props) {
    return (
            <div className='modalWrapper'
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
            }}>
                <section className='modalHeader'>
                    <h3 className='modalHeader__title'>Add Ingredient</h3>
                </section>
                <section className='modalBody'>
                    <form id='ingredientsForm' className='ingredientForm' onSubmit={props.handleAddIngredient}>
                        <div className='ingredientForm__container'>
                            <label className='ingredientForm__label' htmlFor='ingredientName'>Ingredient:</label>
                            <input placeholder='Name' type='text' name='name' id='ingredientName' className='ingredientForm__input' required/>
                        </div>
                        <div className='ingredientForm__container'>
                            <label className='ingredientForm__label' htmlFor='amount'>Amount:</label>
                            <input placeholder='Amount' type='number' min='0' max='1,000,000' name='amount' id='amount' className='ingredientForm__input' required/>
                        </div>
                        <div className='ingredientForm__container'>
                            <label className='ingredientForm__label' htmlFor='measurement'>Measurement:</label>
                            <input placeholder='Measurement' type='text' name='measurment' id='measurement' className='ingredientForm__input'/>
                        </div>
                        <div className='ingredientForm__container'>
                            <p className='ingredientForm__message'>{props.message}</p>
                        </div>
                        <div className='modalFooter'>
                            <button className='subBtn ingredientForm__btn' type='submit'><span>Add Ingredient</span></button>
                            <button className='cancelBtn ingredientForm__btn' onClick={props.close}><span>Close</span></button>
                        </div>
                    </form>
                </section>
            </div>
    );
}

export default AddIngredients;