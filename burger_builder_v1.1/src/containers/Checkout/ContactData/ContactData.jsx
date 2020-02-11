import React, { Component } from 'react';
import axios from '../../../axios'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'


class ContactData extends Component {

    configGenerator = (type, config, initVal, validationConfig) => {
        return {
            elementType: type,
            elementConfig: config,
            value: initVal,
            validation: validationConfig,
            errs: {},
            valid: false,
            touched: false
        }
    }

    state = {
        orderForm: {
            name: this.configGenerator('input', { type: 'text', placeholder: 'Your Name' }, '', { required: true, minLength: 5 }),
            street: this.configGenerator('input', { type: 'text', placeholder: 'Street' }, '', { required: true }),
            city: this.configGenerator('input', { type: 'text', placeholder: 'City' }, '', { required: true }),
            state: this.configGenerator('input', { type: 'text', placeholder: 'State' }, '', { required: true }),
            zip: this.configGenerator('input', { type: 'number', placeholder: 'Zip' }, '', { required: true }),
            email: this.configGenerator('input', { type: 'email', placeholder: 'email' }, '', { required: true }),
            phone: this.configGenerator('input', { type: 'tel', placeholder: 'phone number' }, 'fastest', { required: true }),
            deliveryMethod: this.configGenerator('select', {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            }, '')
        },
        formIsValid: false,
        loading: false
    }


    checkValidity = (value, rules) => {
        const errs = {};
        if (rules === undefined) {
            return [errs, true]
        }
        if (rules.required && value.trim() === '') {
            errs.empty = "This field cannot be empty."
        }
        if (rules.minLength && value.length < rules.minLength) {
            errs.length = "This field has a minimum length of " + rules.minLength + "."
        }
        //More validation checks could go here!!
        // Or use a library
        return [errs, Object.entries(errs).length === 0 && errs.constructor === Object]
    }

    inputChangedHandler = (e, inputId) => {
        const orderForm = { ...this.state.orderForm } // does not create a deep clone
        //deeply clones keys but nested objects are left as references
        //So, clone the nested object you want to change
        const updatedFormElVal = { ...orderForm[inputId] }
        updatedFormElVal.value = e.target.value;
        updatedFormElVal.touched = true;
        [updatedFormElVal.errs, updatedFormElVal.valid] = this.checkValidity(updatedFormElVal.value, updatedFormElVal.validation);
        orderForm[inputId] = updatedFormElVal

        let formIsValid = true;
        for (let val of Object.values(orderForm)) {
            val.validation ? formIsValid = val.valid && formIsValid : formIsValid = true && formIsValid
        }
        this.setState({ orderForm: orderForm, formIsValid: formIsValid })
    }


    orderNowHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let [formElName, config] of Object.entries(this.state.orderForm)) {
            formData[formElName] = config.value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.setState({ loading: true });
        axios.post('/orders.json', order)
            .then(response => {
                alert("Your burger has been ordered!");
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            })

    }


    render() {
        const formElements = [];
        for (let [inputName, config] of Object.entries(this.state.orderForm)) {
            formElements.push(<Input
                key={inputName}
                {...config}
                changed={(e) => { this.inputChangedHandler(e, inputName) }}
            />)
        }
        let form = (
            <form onSubmit={this.orderNowHandler}>
                {formElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER NOW</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);