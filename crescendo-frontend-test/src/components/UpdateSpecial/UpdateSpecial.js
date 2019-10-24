import React, { Component } from 'react';
import { SpecialsContextConsumer, SpecialsContext } from '../../context/specials-context';
import specialAPI from '../../apis/specials';
import './UpdateSpecial.css';

class UpdateSpecial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            specialId: props.match.params.uuid,
        }

    }

    updateSpecialSubmit = (event) => {
        event.preventDefault();
        const geo = `${event.target.latitude.value},${event.target.longitude.value}`;
        const special = {
            title: event.target.title.value,
            type: event.target.type.value,
            geo,
            text: event.target.text.value
        }
        this.context.updateSpecial(this.state.specialId, special);
        this.updateSpecial(special);
    }

    updateSpecial = async (special) => {
        await specialAPI.patch(`/specials/${this.state.specialId}`, special);
        this.setState(this.baseState);
        const form = document.getElementById('updateSpecialForm')
        form.reset();
        this.props.history.push(`/specials`);
    }

    render() {
        return (
            <div>
                <SpecialsContextConsumer>
                    {({ specials }) => {
                        return specials ? specials.map(special => {
                            if (special.uuid === this.state.specialId) {
                                return (
                                    <div className='special__updateFormContainer--main' key={this.state.specialId}>
                                        <h2 className='page__header'>Update Special</h2>
                                        <form id='updateSpecialForm' className='updateSpecialForm' onSubmit={this.updateSpecialSubmit}>
                                            <div className='updateSpecialForm__container'>
                                                <label className='updateSpecialForm__label' htmlFor='updateSpecialForm__title'>Title:</label>
                                                <input className='updateSpecialForm__input' type='text' name='title' id='updateRecipeForm__title' defaultValue={special.title} required/>
                                            </div>
                                            <div className='updateSpecialForm__container'>
                                                <label className='updateSpecialForm__label' htmlFor='updateSpecialForm__type'>Type:</label>
                                                <input className='updateSpecialForm__input' type='text' name='type' id='updateSpecialForm__type' defaultValue={special.type} required/>
                                            </div>
                                            <div className='updateSpecialForm__container'>
                                                <label className='updateSpecialForm__label' htmlFor='updateSpecialForm__longitude'>Longitude:</label>
                                                <input className='updateSpecialForm__input' type='number' name='longitude' min='-180' max='180' id='updateSpecialForm__longitude' />
                                            </div>
                                            <div className='updateSpecialForm__container'>
                                                <label className='updateSpecialForm__label' htmlFor='updateSpecialForm__latitude'>Latitude:</label>
                                                <input className='updateSpecialForm__input' type='number' name='latitude' min='-90' max='90' id='updateSpecialForm__latitude' />
                                            </div>
                                            <div className='updateSpecialForm__container'>
                                                <label className='updateSpecialForm__label' htmlFor='updateSpecialForm__text'>Text:</label>
                                                <input className='updateSpecialForm__input' type='text' name='text' id='updateSpecialForm__text' defaultValue={special.text}/>
                                            </div>
                                            <div className='updateSpecialForm__container'>
                                                <button className='updateSpecialForm__btn' type='submit'>Update Special</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                        })
                        :
                        null
                    }}
                </SpecialsContextConsumer>
            </div>
        )
    }
}

UpdateSpecial.contextType = SpecialsContext;
export default UpdateSpecial;