import React from "react";
import ContactForm from "../Components/ContactForm";
import '../CSS/Contacts.css';

function Contacts() {
    return (
        <div className="contacts-page">
            <h1>Contact Us</h1>
            <ContactForm />
        </div>
    );
}

export default Contacts;
