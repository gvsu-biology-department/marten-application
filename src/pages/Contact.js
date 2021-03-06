import React, { Component } from 'react';
import ContactForm from '../components/forms/ContactForm.js'

class Contact extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | Contact';
    }

    render() {
        return <ContactForm />;
    }
}

export default Contact;
