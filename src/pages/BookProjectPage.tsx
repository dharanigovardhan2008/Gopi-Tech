import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';

const BookProjectPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    budget: '',
    description: '',
    deadline: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Website Development',
    'Mobile App Development',
    'Software Development',
    'UI/UX Design',
    'Logo and Branding',
    'Video Editing',
    'AI/ML Solutions',
    'Cloud Solutions',
    'Cybersecurity Services',
    'API Development',
    'Database Management',
    'Capstone Project',
    'PowerPoint Presentation',
    'Report Writing',
    'Documentation',
    'Website Maintenance',
    'IT Consulting',
    '24/7 Support'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        clientId: user?.uid || null,
        createdAt: serverTimestamp()
      });

      // Generate WhatsApp message
      const message = `New Project Booking - QuantumX Technologies

Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.mobile}
Service: ${formData.service}
Budget: ${formData.budget}
Deadline: ${formData.deadline}
Description: ${formData.description}`;

      const whatsappNumber = 'YOUR_PHONE_NUMBER'; // Replace with actual number
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Show success message
      setSubmitted(true);

      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 2000);

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        service: '',
        budget: '',
        description: '',
        deadline: ''
      });

    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6">
              Start Your Project
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Tell us what you need. We will make it happen.
            </p>
          </motion.div>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-section text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-500 mb-2">
                Booking Submitted Successfully!
              </h3>
              <p className="text-gray-300">
                Redirecting you to WhatsApp...
              </p>
            </motion.div>
          )}

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/10 rounded-section p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 focus:outline-none focus:border-brand-teal transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Budget Offered *
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                  placeholder="$5,000 - $10,000"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 focus:outline-none focus:border-brand-teal transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-[30px] text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300 resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="w-full px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-bold rounded-pill shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Project'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookProjectPage;
