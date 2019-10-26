import React from 'react';
import classes from './Order.css';
const order = (props) => {

    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {

        return (<span key={ig.name}
            style={{
                margin: '2px 5px',
                padding: '5px',
                textTransform: 'capitalize',
                boxShadow: '0px 2px 3px #ccc',
                display: 'inline-block'

            }}>
            {ig.name} ({ig.amount})
             </span>)
    })
    return (

        <div className={classes.Order}>
            <p>ingredients: <strong>{ingredientOutput}</strong></p>
            <p>Price: <strong>{(+props.price).toFixed(2)}</strong></p>


        </div>
    );
}

export default order;