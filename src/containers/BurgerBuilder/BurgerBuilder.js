import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCretors from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,

    }

    componentDidMount() {

        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {

        let sum = Object.keys(ingredients).reduce((sum, key) => {
            return sum + ingredients[key];
        }, 0)

        return sum > 0;
    }



    purchased = () => {


        this.setState({ purchasing: true });
    }

    purchaseContinueHandler = () => {

        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    modalCloseHadler = () => {
        console.log("click");
        this.setState({ purchasing: false });
    }



    render() {

        const disabledControls = {
            ...this.props.ings
        }
        for (let key in disabledControls)
            disabledControls[key] = disabledControls[key] <= 0;

        let orderDetails = null,
            burgerIngredients = this.props.error ? <h1 style={{ textAlign: 'center' }}>Ingredients can't be loaded</h1> : <Spinner />;
        if (this.props.ings) {
            burgerIngredients = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchase={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchased}
                        disabled={disabledControls} />
                </Aux>
            );

            orderDetails = <OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.modalCloseHadler}
                purchaseContinue={this.purchaseContinueHandler} />;

        }



        return (
            <Aux>
                <Modal show={this.state.purchasing} clickHandler={this.modalCloseHadler}>
                    {orderDetails}
                </Modal>
                {burgerIngredients}
            </Aux>

        );

    }

}

const mapStatetoProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCretors.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCretors.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCretors.initIngredients()),
        onPurchaseInit: () => dispatch(actionCretors.purchaseInit())

    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axiosInstance));

