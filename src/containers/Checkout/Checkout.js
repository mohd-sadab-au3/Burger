import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    UNSAFE_componentWillMount() {
        console.log(this.props.location.search);
        if (this.props.location.search) {
            var params = this.props.location.search.split("?")[1].split('&').map(ele => ele.split("="));
            //console.log(temp);
            const ingredients = {};
            let price = 0;
            for (let i = 0; i < params.length; i++) {
                if (params[i][0] === 'price') {
                    price = params[i][1];
                }
                else {
                    ingredients[params[i][0]] = +params[i][1];
                }
            }
            console.log(ingredients);
            this.setState({ ingredients: ingredients, price: price });
        }
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