import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
let navigationItems = (props) => {

    console.log("props is", props);
    return (

        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Order</NavigationItem> : null}
            {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/Auth">Authenticate</NavigationItem>}
        </ul>
    )

}

export default navigationItems;