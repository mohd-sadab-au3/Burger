import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
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
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    cacellHandler={this.checkoutCancellHandler}
                    continueHandler={this.checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-details'}
                    component={ContactData} />
            </div>
        );
    }

}

const mapStatetoProps = state => {

    return {
        ings: state.ingredients
    }
}
export default connect(mapStatetoProps)(Checkout);