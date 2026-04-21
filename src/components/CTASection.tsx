import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-brand-card to-brand-secondary border border-brand-teal/20 rounded-section p-12 md:p-16 text-center shadow-glow"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something
            <br />
            <span className="text-brand-tealLight">Extraordinary?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Let's transform your vision into reality. Our team is ready to help you create innovative digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/book-project"
              className="group px-8 py-4 rounded-pill bg-brand-teal text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Rocket size={20} />
              Book a Project
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-pill bg-transparent border-2 border-brand-teal text-brand-teal font-semibold hover:bg-brand-teal hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
