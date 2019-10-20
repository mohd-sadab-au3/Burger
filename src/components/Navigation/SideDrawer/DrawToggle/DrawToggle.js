import React from 'react';
import classes from './DrawToggle.css';

let drawToggle = (props) => {

    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default drawToggle;