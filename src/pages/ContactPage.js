import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';

class ContactPage extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | Contact';
    }

    render() {
        return (
            <ContactForm/>
        );
    }
}

    export default ContactPage;