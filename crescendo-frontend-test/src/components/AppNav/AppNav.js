import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './AppNav.css';

function AppNav() {
    return (
        <Menu role='navigation' className='nav__container'>
                <Link to='/' className='nav__item--title'>RecipeLookout</Link>
                <Link to='/' className='nav__item'>Home</Link>
                <Link to='/recipes' className='nav__item'>Recipes</Link>
                <Link to='/specials' className='nav__item'>Specials</Link>
        </Menu>
    );
};


export default AppNav;