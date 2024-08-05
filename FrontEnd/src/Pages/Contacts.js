import React from "react";
import ContactForm from "../Components/ContactForm";
import '../CSS/Contacts.css';

function Contacts() {
    return (
        <div className="contacts-page">
            <div className="contacts-left-column">
                <h1>Contact Us</h1>
                <p>Fill out the form below to get in touch with us.</p>
            </div>

            <div className="contacts-right-column">
                <ContactForm />
            </div>
        </div>
    );
}

export default Contacts;
