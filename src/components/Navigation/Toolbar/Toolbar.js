import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

let toolbar = (props) => {
    console.log("props toolbar", props);
    return (
        <header className={classes.Toolbar}>
            <DrawToggle clicked={props.showMenu} />
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isauth} />
            </nav>

        </header>


    );
}

export default toolbar;
