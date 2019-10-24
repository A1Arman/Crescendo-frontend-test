import React from 'react';
import './AddDirections.css';

function AddDirections(props) {
    return (
        <div className='modalWrapper'
        style={{
            transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            <section className='modalHeader'>
                <h3 className='modalHeader__title'>Add Direction</h3>
            </section>
            <section className='modalBody'>
                <form id='addDirectionForm' className='addDirectionForm' onSubmit={props.handleAddDirection}>
                    <div className='addDirectionForm__container'>
                        <label className='addDirectionForm__label' htmlFor='instructions'>Instructions:</label>
                        <input className='addDirectionForm__input' placeholder='Instructions' type='text' name='instructions' id='instructions' required/>
                    </div>
                    <div className='addDirectionForm__container--radio'>
                        <p>Optional:</p>
                        <div>
                            <input type='radio' name='optional' value='true' id='option1' defaultChecked/>
                            <label htmlFor='option1'>Yes</label>
                        </div>
                        <div>
                            <input type='radio' name='optional' value='false' id='option2'/>
                            <label htmlFor='option2'>No</label>
                        </div>
                    </div>
                    <div className='addDirectionForm__container'>
                        <p className='addDirectionForm__message'>{props.message}</p>
                    </div>
                    <div className='modalFooter'>
                        <button className='subBtn addDirectionForm__btn' type='submit'>Add Direction</button>
                        <button className='cancelBtn addDirectionForm__btn' type='button' onClick={props.close}>Close</button>
                    </div>
                </form>
            </section>
        </div>
    )
};

export default AddDirections;