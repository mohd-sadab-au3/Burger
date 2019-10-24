import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {


    checkoutCancellHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-details");
    }

    render() {

        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const redirectPurchased = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {redirectPurchased}
                    <CheckoutSummary ingredients={this.props.ings}
                        cacellHandler={this.checkoutCancellHandler}
                        continueHandler={this.checkoutContinueHandler} />
                    <Route path={this.props.match.path + '/contact-details'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }

}

const mapStatetoProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStatetoProps)(Checkout);