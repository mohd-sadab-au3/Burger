import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar showMenu={this.openSideDrawerHandler} isauth={this.props.authenticated} />
                <SideDrawer open={this.state.showSideDrawer} isauth={this.props.authenticated} clicked={this.showSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>

        );
    }
}
const mapStatetoProps = state => {

    return {
        authenticated: state.auth.token
    }
}
export default connect(mapStatetoProps)(Layout);