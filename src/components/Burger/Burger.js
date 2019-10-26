import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import classes from './Burger.css';

let burger = (props) => {

    //Object.keys(objname) javascript method convert keys of object to array
    let transformIngredients = [];
    if (props.ingredients) {
        transformIngredients = Object.keys(props.ingredients)
            .map(igKey => {

                return [...Array(props.ingredients[igKey])].map((_, index) => {

                    return <BurgerIngredients type={igKey} key={igKey + index} />
                })
            }).reduce((arr, curr) => {

                return arr.concat(curr);
            }, []);
    }

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please add ingredients!!</p>
    }

    return (


        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformIngredients}
            <BurgerIngredients type="bread-bottom" />

        </div>


    )



}

export default burger;