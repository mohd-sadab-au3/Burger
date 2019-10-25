import React, { Component } from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
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
        formIsValid: false,
        signUp: true,
    }
    checkValidity(rules, value) {

        let valid = true;

        if (rules.required) {
            valid = value.trim() !== '' && valid
        }

        // console.log(valid);
        return (valid);
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


    submitForm = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value, this.state.signUp);
    }

    switchMethodHandler = (event) => {

        event.preventDefault();
        this.setState(prevState => {
            return { signUp: !prevState.signUp }
        });
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }


        let errorMsg = null;

        if (this.props.error) {
            errorMsg = (<p>{this.props.error.message}</p>)
        }

        let redirect = null;
        if (this.props.isAuth && !this.props.building) {
            redirect = (<Redirect to="/" />);
        } else if (this.props.isAuth) {
            redirect = (<Redirect to="/checkout" />);
        }

        let form = (<form onSubmit={this.submitForm}>
            {errorMsg}
            {redirect}
            {formElements.map(formElem => (
                <Input key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid}
                    viewed={formElem.config.viewed}
                    changeHandler={(event) => this.inputChangeHandler(event, formElem.id)} />
            ))}
            <Button btnType="Success" >{this.state.signUp ? 'SIGN-UP' : 'SIGN-IN'}</Button>
            <br></br>
            <Button btnType="Danger"
                clicked={this.switchMethodHandler} >SWITCH TO {this.state.signUp ? 'SIGN-UP' : 'SIGN-IN'}</Button>
        </form>

        )

        if (this.props.loading)
            form = (<Spinner />);

        return (
            <div className={classes.Auth}>
                <h4>Fill the details here!!</h4>
                {form}

            </div>
        )
    }


}

const mapDispatchToProps = dispatch => {
    return {

        onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
    }
}

const mapStatetoProps = state => {

    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);