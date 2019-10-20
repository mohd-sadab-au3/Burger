import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }


]
let buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong> Rs.</p>
        {controls.map(ctrl =>

            <BuildControl label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} disabled={props.disabled[ctrl.type]} />
        )}

        <button className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchase}>ORDER NOW</button>
    </div>

)

export default buildControls;