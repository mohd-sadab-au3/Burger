import React from 'react';
import classes from './Order.css';
const order = (props) => {

    console.log(props);
    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    // console.log(ingredients);
    const ingredientOutput = ingredients.map(ig => {

        return (<span key={ig.name}
            style={{
                margin: '0px 5px',
                padding: '10px',
                textTransform: 'capitalize',
                boxShadow: '0px 2px 3px #ccc',
                boxSizing: 'border-box'

            }}>
            {ig.name} ({ig.amount})
             </span>)
    })
    return (

        <div className={classes.Order}>
            <p>ingredients: <strong>{ingredientOutput}</strong></p>
            <p>Price: <strong>{(+props.price).toFixed(2)}</strong></p>
            <p></p>

        </div>
    );
}

export default order;