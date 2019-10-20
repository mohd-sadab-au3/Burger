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
import * as actionType from '../../store/action';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {

        // axiosInstance.get("https://burger-builder-ca35c.firebaseio.com/ingredients.json").then(res => {

        //     this.setState({ ingredients: res.data });
        // }).catch(error => {
        //     this.setState({ error: true })
        //     console.log(error)
        // });

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

    modalCloseHadler = () => {
        console.log("click");
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {


        let queryParams = [];
        for (let ing in this.props.ings) {
            queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.props.ings[ing]));
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render() {

        const disabledControls = {
            ...this.props.ings
        }
        for (let key in disabledControls)
            disabledControls[key] = disabledControls[key] <= 0;

        let orderDetails = null,
            burgerIngredients = this.state.error ? <h1 style={{ textAlign: 'center' }}>Ingredients can't be loaded</h1> : <Spinner />;
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


        if (this.state.loading) {
            orderDetails = <Spinner />;
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.DELETE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axiosInstance));

