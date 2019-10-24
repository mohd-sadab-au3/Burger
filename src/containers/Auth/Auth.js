import React, { Component } from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
class Auth extends Component {

    setter(inputType, elemtype, placeholder, value) {
        return ({
            elementType: inputType,
            elementConfig: {
                type: elemtype,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: true
            },
            valid: false,
            viewed: false,

        });
    }
    state = {
        controls: {
            email: this.setter('input', 'email', 'Email Address', ''),
            password: this.setter('input', 'password', 'Enter Password', ''),

        },
        formIsValid: false
    }
    inputChangeHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        // console.log(inputIdentifier);
        const updatedForm = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.viewed = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.validation,
            updatedFormElement.value);
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let key in updatedForm) {
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        this.setState({ controls: updatedForm, formIsValid: formIsValid });
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (<form>

            {formElements.map(formElem => (
                <Input key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid}
                    viewed={formElem.config.viewed}
                    changeHandler={(event) => this.inputChangeHandler(event, formElem.id)} />
            ))}
            <Button btnType="Success" >ORDER</Button>
        </form>

        )

        return (
            <div className={classes.Auth}>
                <h4>Fill the details here!!</h4>
                {form}

            </div>
        )
    }


}


export default Auth;