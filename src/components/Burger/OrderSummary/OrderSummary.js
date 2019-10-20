import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
let orderSummary = (props) => {

    let ingredientSummary = Object.keys(props.ingredients).map(igKey => {

        return (<li key={igKey}>{igKey} : {props.ingredients[igKey]}</li>);
    }
    )

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>List of delecious ingredients </p>
            <ul>

                {ingredientSummary}

            </ul>
            <p><strong>Price: </strong>{props.price}</p>
            <p>continue for checkout ??</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>

        </Aux>
    );


}

export default orderSummary;