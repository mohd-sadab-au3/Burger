import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';


const componentSummary = (props) => {

    return (

        <div className={classes.CheckoutSummary}>
            <h1>I hope it style well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                <Button btnType="Danger" clicked={props.cacellHandler}> CANCEL</Button>
                <Button btnType="Success" clicked={props.continueHandler} > CONTINUE</Button>
            </div>
        </div>

    );

}

export default componentSummary;