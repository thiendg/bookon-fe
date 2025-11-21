// src/pages/home/views/FaqPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { faqService } from '@/services/faq.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconQuestionMark } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFaqs = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await faqService.getFaqs({ limit: 100 }); // Fetch all or a large number
            if (response.success) {
                // Backend returns 'faqs', 'total', 'page', 'limit'
                setFaqs(response.data.faqs || []);
            } else {
                throw new Error(response.message || 'Failed to fetch FAQs');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching FAQs.');
            setFaqs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    return (
        <BasePage title="Frequently Asked Questions">
            <Helmet>
                <meta name="description" content="Find answers to common questions about BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>

                {loading ? (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading FAQs...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Error</h3>
                        <p>{error}</p>
                        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
                    </div>
                ) : faqs.length > 0 ? (
                    <div className="accordion" id="faqAccordion">
                        {faqs.map(faq => (
                            <div className="accordion-item" key={faq.id}>
                                <h2 className="accordion-header" id={`heading${faq.id}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${faq.id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${faq.id}`}
                                    >
                                        {faq.question}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${faq.id}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${faq.id}`}
                                    data-bs-parent="#faqAccordion"
                                >
                                    <div className="accordion-body">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <div className="empty-img">
                            <IconQuestionMark className="icon" style={{ width: '4rem', height: '4rem' }} />
                        </div>
                        <p className="empty-title">No FAQs found</p>
                        <p className="empty-subtitle">No frequently asked questions available.</p>
                        <div className="empty-action">
                            <Link to="/" className="btn btn-primary">
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default FaqPage;
