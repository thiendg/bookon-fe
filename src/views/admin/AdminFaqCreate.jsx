// src/pages/admin/views/AdminFaqCreate.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { faqService } from '@/services/faq.service';
import { Helmet } from 'react-helmet-async';
import { IconArrowLeft, IconQuestionMark, IconPlus } from '@tabler/icons-react';

// Import generic components
import AdminForm from '@/components/admin/AdminForm';
import TextInput from '@/components/admin/TextInput';

const AdminFaqCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
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

        if (!formData.question.trim() || !formData.answer.trim()) {
            setError('Question and Answer are required.');
            setSubmitting(false);
            return;
        }

        try {
            const createData = {
                question: formData.question,
                answer: formData.answer,
            };
            const response = await faqService.createFaq(createData);
            if (response.success) {
                setSuccessMessage('FAQ created successfully!');
                setFormData({ // Clear form
                    question: '',
                    answer: '',
                });
                setTimeout(() => navigate('/admin/faqs'), 1500); // Redirect after success
            } else {
                throw new Error(response.message || 'Failed to create FAQ');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during creation.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Create New FAQ | Admin - BookOn</title>
            </Helmet>
            <AdminForm
                title="Create New FAQ"
                backLink="/admin/faqs"
                backLinkText="Back to FAQs"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
                successMessage={successMessage}
                submitText="Create FAQ"
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

export default AdminFaqCreate;
