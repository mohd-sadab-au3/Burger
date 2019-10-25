import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


let sideDrawer = (props) => {

    let isSideOpen = [classes.SideDrawer, classes.Close];
    if (props.open) {

        isSideOpen = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.clicked} />
            <div className={isSideOpen.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth={props.isauth} />
                </nav>


            </div>
        </Aux>

    )

}

export default sideDrawer;