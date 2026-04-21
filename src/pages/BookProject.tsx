import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { createBooking } from '../lib/firestore';
import { redirectToWhatsApp } from '../lib/whatsapp';
import { useAuth } from '../hooks/useAuth';

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
  '24/7 Support',
];

const BookProject = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    budget: '',
    description: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firestore
      await createBooking({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        service: formData.service,
        budget: formData.budget,
        description: formData.description,
        deadline: formData.deadline,
        status: 'pending',
        clientId: user?.uid,
      });

      // Redirect to WhatsApp
      redirectToWhatsApp(formData);

      // Show success
      setSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        service: '',
        budget: '',
        description: '',
        deadline: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-section p-12 text-center shadow-glow"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-pill bg-brand-teal/10 text-brand-teal">
              <CheckCircle size={48} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Booking Submitted!</h2>
          <p className="text-slate-400 mb-8">
            Your project booking has been submitted successfully. We'll get back to you soon via WhatsApp.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-8 py-4 rounded-pill bg-brand-teal text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your <span className="text-brand-tealLight">Project</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Tell us what you need. We will make it happen.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-section p-8 md:p-12 shadow-glow"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white placeholder-slate-500 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white placeholder-slate-500 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-slate-300 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white placeholder-slate-500 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="+1 (234) 567-8900"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
                Service Type *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white focus:border-brand-teal focus:outline-none transition-colors appearance-none cursor-pointer"
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
              <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                Budget Offered *
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white placeholder-slate-500 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="e.g., $5,000 - $10,000"
              />
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-300 mb-2">
                Deadline (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-pill bg-brand-primary border border-brand-teal/20 text-white focus:border-brand-teal focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-[30px] bg-brand-primary border border-brand-teal/20 text-white placeholder-slate-500 focus:border-brand-teal focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project requirements..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 rounded-pill bg-gradient-to-r from-brand-teal to-brand-tealLight text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send size={20} />
                  Submit Booking
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookProject;
