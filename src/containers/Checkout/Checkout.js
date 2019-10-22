import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {



    checkoutCancellHandler = () => {
        console.log("AKS:KA:");
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        console.log("AKS:KA:");
        this.props.history.replace("/checkout/contact-details");
    }

    render() {

        let summary = <Redirect to="/" />
        if (this.props.ings) {

            summary = (
                <div>
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

    }
}
export default connect(mapStatetoProps)(Checkout);