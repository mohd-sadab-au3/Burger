import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import { connect } from 'react-redux';

class ContactData extends Component {

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
        orderform: {
            name: this.setter('input', 'text', 'Your Name', ''),
            email: this.setter('input', 'email', 'Your Email', ''),
            address: this.setter('input', 'text', 'Address', ''),
            street: this.setter('input', 'text', 'Your Street ', ''),
            zipCode: this.setter('input', 'text', 'Your Zip code', ''),
            country: this.setter('input', 'text', 'Your Country', ''),
        },
        loading: false,
        formIsValid: false
    }
    orderHandler = (event) => {

        event.preventDefault();
        // console.log(this.props);
        this.setState({ loading: true });

        let formData = {};
        for (let key in this.state.orderform) {
            formData[key] = this.state.orderform[key].value;
        }
        const orderDetails = {
            ingredients: this.props.ingredients,
            orderDetails: formData,
            price: this.props.price


        }
        axiosInstance.post('/orders.json', orderDetails)
            .then(response => {
                this.setState({ loading: false });
                // console.log("Order", this.props.history);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false });
            });

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
            ...this.state.orderform
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
        this.setState({ orderform: updatedForm, formIsValid: formIsValid });
    }


    render() {

        const formElements = [];

        for (let key in this.state.orderform) {
            formElements.push({
                id: key,
                config: this.state.orderform[key]
            });
        }

        let form = (<form onSubmit={this.orderHandler}>

            {formElements.map(formElem => (
                <Input key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid}
                    viewed={formElem.config.viewed}
                    changeHandler={(event) => this.inputChangeHandler(event, formElem.id)} />
            ))}

            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (

            <div className={classes.ContactData}>
                <h4>Fill the details here!!</h4>
                {form}

            </div>

        );
    }
}

const mapStatetoProps = state => {

    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStatetoProps)(ContactData);