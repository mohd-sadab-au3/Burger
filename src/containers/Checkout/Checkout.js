import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }



    checkoutCancellHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-details");
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    cacellHandler={this.checkoutCancellHandler}
                    continueHandler={this.checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-details'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        );
    }

}

export default Checkout;