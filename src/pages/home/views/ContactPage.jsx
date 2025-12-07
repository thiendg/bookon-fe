// src/pages/home/views/ContactPage.jsx
import React, { useState } from 'react';
import { contactService } from '@/services/contact.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { EnvelopeIcon, UserIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useSettings } from '@/context/SettingsContext';

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
        <BasePage title="Contact Us" currentPage="contact">
            <Helmet>
                <meta name="description" content="Contact BookOn for any queries, feedback, or support." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Contact Us</h1>
                    <p className="mt-2 text-base text-gray-600">We'd love to hear from you. Please fill out the form below.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        {successMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
                                <p>{successMessage}</p>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <div className="relative">
                                    <span className="absolute top-3 left-0 flex items-center pl-3">
                                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                        disabled={submitting}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                    <PaperAirplaneIcon className="h-5 w-5 ml-2" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <ContactInfo />
                </div>
            </div>
        </BasePage>
    );
};

const ContactInfo = () => {
    const settings = useSettings();
    return (
        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Contact Information</h2>
            <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    <span>{settings.address || '123 Bookworm Lane, Reading, RW 45678'}</span>
                </div>
                <div className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    <a href={`mailto:${settings.email || 'support@bookon.com'}`} className="hover:underline hover:text-indigo-800">{settings.email || 'support@bookon.com'}</a>
                </div>
                <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 mr-3 text-indigo-600" />
                    <span>{settings.phone || '+123 456 7890'}</span>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800">Working Hours</h3>
                <p className="mt-1 text-gray-600">Monday - Friday: 9am - 6pm</p>
                <p className="text-gray-600">Saturday: 10am - 4pm</p>
                <p className="text-gray-600">Sunday: Closed</p>
            </div>
        </div>
    );
};

export default ContactPage;
