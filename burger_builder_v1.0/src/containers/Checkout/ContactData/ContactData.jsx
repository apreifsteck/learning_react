import React, { Component } from 'react';
import axios from '../../../axios'

import Button from '../../../components/UI/Button/Button'

import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        loading: false
    }

    orderNowHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            cust: {
                name: "Austin",
                address: {
                    street: "a street",
                    city: "Cbus",
                    state: "Ohiogozimasu",
                    zip: "43210"
                },
                email: "apreifsteck@trashcan.com",
                phone: "513-xxx-xxxx"
            },
            deliveryMethod: "Fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                alert("Your burger has been ordered!");
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            })

    }


    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="email" />
                    <input className={classes.Input} type="tel" name="phone" placeholder="phone number" />
                    <input className={classes.Input} type="text" name="street" placeholder="street" />
                    <input className={classes.Input} type="text" name="city" placeholder="city" />
                    <input className={classes.Input} type="text" name="state" placeholder="state" />
                    <input className={classes.Input} type="text" name="zip" placeholder="zip" />
                    <Button btnType="Success" clicked={this.orderNowHandler}>ORDER NOW</Button>
                </form>
            </div>
        );
    }
}
export default ContactData;