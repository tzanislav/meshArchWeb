import React from "react";
import { useState, useEffect } from 'react';
import axios from '../axios-config';
import emailjs from 'emailjs-com';
import '../CSS/ContactForm.css';

function ContactForm() {

    const [mailKey, setMailKey] = useState('');

    useEffect(() => {
        const fetchMailKey = async () => {
            try {
                const res = await axios.get('/api/mailKey');
                setMailKey(res.data);
            } catch (error) {
                console.error('Error fetching mail key', error);
            }
        };

        fetchMailKey();
    }, []);




    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        emailjs.send('service_ttev204', 'template_2xhaf3m', formData, mailKey)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      };


      if (!mailKey) {
        return <div>Server Error...</div>;
      }

    
      return (
        <form onSubmit={handleSubmit} className="contact-form">

            <label>Name*:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email*:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Message*:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send</button>

        </form>
      );
    };
    
    export default ContactForm;