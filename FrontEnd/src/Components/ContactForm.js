import React from "react";
import { useState } from "react";
import emailjs from "emailjs-com";
import "../CSS/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // For success/failure feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ttev204", // Replace with your EmailJS Service ID
        "template_2xhaf3m", // Replace with your EmailJS Template ID
        formData,
        "a91edKYS9lbhZMcTm" // Replace with your EmailJS API Key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Clear form
        },
        () => {
          setStatus("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className="contact-form">
      <p>Tel: <a href="tel:+359887618814"> 0887 61 88 14</a></p>
      <p>Email: <a href="mailto:office@meshArch.studio"> office@meshArch.studio</a></p>
      <a href="https://www.facebook.com/meshArchitecture" target="_blank" rel="noreferrer"> Facebook</a>

      
      <form onSubmit={handleSubmit}>
        <div className="form-contact">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactForm;
