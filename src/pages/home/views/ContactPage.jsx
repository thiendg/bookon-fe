// src/pages/home/views/ContactPage.jsx
import React, { useState } from 'react';
import { contactService } from '@/services/contact.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconMail, IconUser, IconMessage, IconSend } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError('All fields are required.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await contactService.createContact(formData);
            if (response.success) {
                setSuccessMessage('Your message has been sent successfully! We will get back to you soon.');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while sending your message.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BasePage title="Contact Us">
            <Helmet>
                <meta name="description" content="Contact BookOn for any queries, feedback, or support." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Contact Us</h1>

                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Send us a message</h3>
                        </div>
                        <div className="card-body">
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Your Name</label>
                                    <div className="input-icon">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                            disabled={submitting}
                                        />
                                        <span className="input-icon-addon">
                                            <IconUser />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Your Email</label>
                                    <div className="input-icon">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            disabled={submitting}
                                        />
                                        <span className="input-icon-addon">
                                            <IconMail />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        required
                                        disabled={submitting}
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting ? 'Sending...' : 'Send Message'}
                                        <IconSend className="icon ms-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5 text-muted">
                    <p>Alternatively, you can reach us at support@bookon.com</p>
                    <p>Or call us at +123 456 7890</p>
                </div>
            </div>
        </BasePage>
    );
};

export default ContactPage;
