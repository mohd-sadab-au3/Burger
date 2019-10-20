import React from 'react';
import burgerImg from '../../assets/images/27.1 burger-logo.png.png';
import classes from './Logo.css';

let logo = (props) => (

    <div className={classes.Logo}>
        <img src={burgerImg} alt="MyBurger" />

    </div>


);

export default logo;