import React from 'react';
import { Link } from 'react-router-dom';
import { SpecialsContextConsumer } from '../../context/specials-context';
import './SpecialsList.css';

function SpecialsList() {
    return (
        <div className='specialsList__wrapper'>
            <h1 className='page__header--list'>Specials</h1>
            <Link className='btn btn--add' to='/specials/addSpecial'>+</Link>
            <div className='specialsList__container--main'>
                <SpecialsContextConsumer>
                    {({ specials }) => {
                            return specials ? specials.map(special => {
                            return (
                                <div className='specialsList__container' key={special.uuid}>
                                    <div className='specialsList__container--title'>
                                        <h2 className='specialsList__title--secondary'>{special.title}</h2>
                                    </div>
                                    <div className='specialsList__container--content'>
                                        <div className='specialsList__text' dangerouslySetInnerHTML={{ __html: special.text}} />
                                        <p className='specialsList__type'>Type: {special.type}</p>
                                        <p className='specialsList__location'>Location: {special.geo ? special.geo : 'Not Found'}</p>
                                        <Link className='btn specialsList__btn' to={`/specials/${special.uuid}`}>Update</Link>
                                    </div>
                                </div>
                            )
                        }) : 'Loading';
                    }}
                </SpecialsContextConsumer>
            </div>
        </div>
    );
}

export default SpecialsList;