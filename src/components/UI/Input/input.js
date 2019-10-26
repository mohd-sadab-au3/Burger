import React from 'react';
import classes from './input.css';
const input = (props) => {


    let inputElem = null;
    let msg = null;

    if (props.invalid && props.viewed) {
        msg = (<div className={classes.Alert}>This field is required</div>);
    }

    switch (props.elementType) {

        case ('input'):
            inputElem = (<div><input {...props.elementConfig} className={classes.InputElement} onChange={props.changeHandler} value={props.value} />
                {msg}
            </div>
            )
            break;
        default:
            inputElem = <input {...props.elementConfig} className={classes.InputElement} onChange={props.changeHandler} value={props.value} />

    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>

    )

}

export default input;