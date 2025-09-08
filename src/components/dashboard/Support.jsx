import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your support system
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setContactForm({ subject: '', category: 'general', message: '' });
  };

  const tabs = [
    { id: 'contact', name: 'Contact Support', icon: ChatBubbleLeftRightIcon },
    { id: 'faq', name: 'FAQ', icon: QuestionMarkCircleIcon },
    { id: 'docs', name: 'Documentation', icon: DocumentTextIcon },
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the Orders section in your dashboard. Each order will show its current status and tracking information if available.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition. Custom neon signs and personalized items are non-returnable unless defective.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days, while expedited shipping takes 1-2 business days. Custom orders may take an additional 7-10 days for production.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 1 hour of placement if they haven\'t entered production. After that, please contact support for assistance.',
    },
    {
      question: 'Do you offer installation services?',
      answer: 'Yes, we offer professional installation services in select metropolitan areas. Contact support to check availability in your area.',
    },
  ];

  const supportChannels = [
    {
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatBubbleLeftRightIcon,
      action: 'Start Chat',
      available: 'Mon-Fri 9AM-6PM PST',
    },
    {
      name: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: PhoneIcon,
      action: 'Call Now',
      available: '1-800-NOX-NEON',
    },
    {
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: EnvelopeIcon,
      action: 'Send Email',
      available: 'support@noxneon.com',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Support Center</h2>
        <p className="text-gray-400">Get help with your orders, account, and products</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg flex items-center space-x-2"
        >
          <CheckIcon className="w-5 h-5 flex-shrink-0" />
          <span>Your message has been sent! We'll get back to you within 24 hours.</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20">
        <div className="flex border-b border-cyan-500/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Support Channels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {supportChannels.map((channel, index) => (
                  <div
                    key={channel.name}
                    className="bg-black/10 rounded-lg p-4 border border-cyan-500/10 text-center"
                  >
                    <channel.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <h3 className="text-white font-medium mb-1">{channel.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{channel.description}</p>
                    <p className="text-cyan-400 text-xs mb-3">{channel.available}</p>
                    <button className="w-full bg-cyan-500/20 text-cyan-400 py-2 px-4 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">
                      {channel.action}
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={contactForm.category}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, category: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="general">General Question</option>
                    <option value="order">Order Issue</option>
                    <option value="product">Product Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Issue</option>
                    <option value="return">Return/Exchange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Please provide as much detail as possible about your issue..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-black/10 rounded-lg p-6 border border-cyan-500/10"
                >
                  <h4 className="text-white font-medium mb-3 flex items-start">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-gray-300 leading-relaxed pl-7">{faq.answer}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'docs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Documentation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/10 rounded-lg p-6 border border-cyan-500/10">
                  <DocumentTextIcon className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="text-white font-medium mb-2">Installation Guide</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Step-by-step instructions for installing your neon lights safely and securely.
                  </p>
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                    View Guide →
                  </button>
                </div>

                <div className="bg-black/10 rounded-lg p-6 border border-cyan-500/10">
                  <DocumentTextIcon className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-white font-medium mb-2">Care & Maintenance</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Learn how to keep your neon lights looking bright and lasting longer.
                  </p>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    View Guide →
                  </button>
                </div>

                <div className="bg-black/10 rounded-lg p-6 border border-cyan-500/10">
                  <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400 mb-4" />
                  <h4 className="text-white font-medium mb-2">Safety Guidelines</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Important safety information and precautions for handling LED products.
                  </p>
                  <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                    View Guide →
                  </button>
                </div>

                <div className="bg-black/10 rounded-lg p-6 border border-cyan-500/10">
                  <DocumentTextIcon className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="text-white font-medium mb-2">Troubleshooting</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Common issues and solutions to help you resolve problems quickly.
                  </p>
                  <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                    View Guide →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
