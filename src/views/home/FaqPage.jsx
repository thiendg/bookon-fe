// src/pages/home/views/FaqPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { faqService } from '@/services/faq.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { IconQuestionMark } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const frequents = ['Đặt hàng', 'Vận chuyển', 'Phí', 'Đơn hàng']; // Fetch later from data analyzing process

    const fetchFaqs = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                limit: 100,
                ...(debouncedSearchTerm && { search: debouncedSearchTerm })
            };
            const response = await faqService.getFaqs(params); // Fetch all or a large number
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
    }, [debouncedSearchTerm]);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    let FAQBlock = (
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
    );

    if (loading) {
        FAQBlock = (
            <div className="text-center py-10">
                <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-gray-600">Loading FAQs...</p>
            </div>
        );
    } else if (error) {
        FAQBlock = (
            <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                <h3 className="font-semibold">Error</h3>
                <p>{error}</p>
                <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">Back to homepage</Link>
            </div>
        )
    } else if (faqs.length > 0) {
        FAQBlock = (
            <div className="space-y-2 bg-white rounded-2xl p-4">
                {faqs.map((faq, index) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-3 py-2 text-left flex justify-between items-center transition-colors"
                        >
                            <span className="font-semibold text-gray-900">{faq.question}</span>
                            <ChevronDownIcon
                                className={`w-3 h-3 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                        >
                            <div className="px-3 py-2 text-gray-600 border-t border-gray-200">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <BasePage title="FAQs" currentPage='faq'>
            <Helmet>
                <meta name="description" content="Find answers to common questions about BookOn." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className='flex items-center justify-between overflow-auto font-bold w-2/3 mb-2'>
                    <h1 className="text-[20px]! text-[#006E54]! mx-3 mb-0">Frequently Asked</h1>
                    {frequents.map((f) => (
                        <span
                            key={f}
                            onClick={() => setSearchTerm(f)}
                            className='hover:underline cursor-pointer whitespace-nowrap'
                        >{f}</span>
                    ))}
                </div>
                <div className='bg-white rounded-full border border-[#006E54]! px-3 py-2 mb-2 flex justify-between'>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder='Find your issue here...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full focus:outline-none'
                    />
                    {searchTerm && <span
                        className="text-sm cursor-pointer font-bold text-[#006E54]"
                        onClick={() => setSearchTerm('')}
                    >
                        Clear
                    </span>}
                </div>
                {FAQBlock}
                <div className='m-2'>
                    Cannot find your problem? <a className='text-[#006E54]! font-bold cursor-pointer' href='./contact'>Ask now</a>
                </div>
            </div>
        </BasePage>
    );
};

export default FaqPage;
