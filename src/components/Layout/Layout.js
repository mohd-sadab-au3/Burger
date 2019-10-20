import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {

        console.log("click");
        this.setState({
            showSideDrawer: false
        })
    }
    openSideDrawerHandler = () => {
        this.setState((prevstate) => {
            return { showSideDrawer: !prevstate.showSideDrawer }
        })
    }
    render() {
        return (

            <Aux>
                <Toolbar showMenu={this.openSideDrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} clicked={this.showSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>

        );
    }
}
export default Layout;