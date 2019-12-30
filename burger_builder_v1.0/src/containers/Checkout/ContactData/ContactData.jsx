import React, { Component } from 'react';

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
        }
    }
    render() {
        return (
            <div>
                <h4>Enter your contact info</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="email" />
                    <input type="tel" name="phone" placeholder="phone number" />
                    <input type="text" name="street" placeholder="street" />
                    <input type="text" name="city" placeholder="city" />
                    <input type="text" name="state" placeholder="state" />
                    <input type="text" name="zip" placeholder="zip" />
                </form>
            </div>
        );
    }
}
export default ContactData;