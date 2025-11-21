// src/pages/admin/views/AdminFaqDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { faqService } from '@/services/faq.service';
import { Helmet } from 'react-helmet-async';
import {
    IconArrowLeft,
    IconQuestionMark,
    IconEdit,
    IconCheck,
    IconX
} from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';


const AdminFaqDetail = () => {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [faq, setFaq] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchFaq = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await faqService.getFaqById(id);
            if (response.success) {
                setFaq(response.data);
                setFormData({
                    question: response.data.question,
                    answer: response.data.answer,
                });
            } else {
                throw new Error(response.message || 'Failed to fetch FAQ details');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching FAQ details.');
            setFaq(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchFaq();
    }, [fetchFaq]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccessMessage('');

        if (!faq || !id) {
            setError('FAQ data not found.');
            setSubmitting(false);
            return;
        }
        if (!formData.question.trim() || !formData.answer.trim()) {
            setError('Question and Answer are required.');
            setSubmitting(false);
            return;
        }

        try {
            const updateData = {
                question: formData.question,
                answer: formData.answer,
            };
            const response = await faqService.updateFaq(id, updateData);
            if (response.success) {
                setSuccessMessage('FAQ updated successfully!');
                fetchFaq(); // Refresh data
            } else {
                throw new Error(response.message || 'Failed to update FAQ');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during update.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconQuestionMark className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">Loading FAQ details...</p>
            </div>
        );
    }

    if (error && !faq) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconX className="icon text-danger" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title text-danger">Error: {error}</p>
                <p className="empty-subtitle">Could not load FAQ details. <Link to="/admin/faqs">Go back to FAQ List</Link></p>
            </div>
        );
    }

    if (!faq) {
        return (
            <div className="empty">
                <div className="empty-img">
                    <IconQuestionMark className="icon" style={{ width: '4rem', height: '4rem' }} />
                </div>
                <p className="empty-title">FAQ not found</p>
                <p className="empty-subtitle">The FAQ with ID "{id}" does not exist. <Link to="/admin/faqs">Go back to FAQ List</Link></p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit FAQ: {faq.question} | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title={`Edit FAQ: ${faq.id}`}
                backLink="/admin/faqs"
                backLinkText="Back to FAQs"
                onSubmit={handleUpdate}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Save Changes"
            >
                <TextInput
                    label="Question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Enter FAQ question"
                    required
                    icon={IconQuestionMark}
                />
                <TextInput
                    label="Answer"
                    name="answer"
                    type="textarea"
                    value={formData.answer}
                    onChange={handleChange}
                    placeholder="Enter FAQ answer"
                    required
                    rows={5}
                />
            </AdminForm>
        </>
    );
};

export default AdminFaqDetail;
