import React from 'react';
import { Link } from 'react-router-dom';
import chefHat from '../../images/chef-hat.svg';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className='landingPage__container--main'>
            <img className='logo-svg' src={chefHat} alt='logo' title='logo'></img>
            <section className='landingPage__container--hero'>
                <h1 className='landingPage__title'>RecipeLookout</h1>
                <p className='landingPage__description'>Make your life easier with RecipeLookout!</p>
                <Link to='/recipes' className='btn landingPage__button'>Get Started</Link>
            </section>
            <section className='landingPage__cardContainer'>
                <div className='landingPage__card'>
                    <div className='landingPage__card--content'>
                        <div className='landingPage__card--front'>
                            <h3 className='landingPage__card--title'>Quick and Easy</h3>
                        </div>
                        <div className='landingPage__card--back'>
                            <p className='landingPage__card--body'>All your recipes at the tip of your fingers. Quickly find the recipe you need.</p>
                        </div>
                    </div>
                </div>
                <div className='landingPage__card'>
                    <div className='landingPage__card--content'>
                        <div className='landingPage__card--front'>
                            <h3 className='landingPage__card--title'>Create Recipe</h3>
                        </div>
                        <div className='landingPage__card--back'>
                            <p className='landingPage__card--body'>Have a new recipe? Quickly and easily add it to your recipe book!</p>
                        </div>
                    </div>
                </div>
                <div className='landingPage__card'>
                    <div className='landingPage__card--content'>
                        <div className='landingPage__card--front'>
                            <h3 className='landingPage__card--title'>Create Special</h3>
                        </div>
                        <div className='landingPage__card--back'>
                            <p className='landingPage__card--body'>Found a special on an ingredient? Easily add it to your list of specials and never miss the deal!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default LandingPage;