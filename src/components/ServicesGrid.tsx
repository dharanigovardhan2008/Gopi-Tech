import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Brain, Cloud, Shield } from 'lucide-react';

const featuredServices = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native iOS and Android applications with seamless user experiences.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love to interact with.',
  },
  {
    icon: Brain,
    title: 'AI/ML Solutions',
    description: 'Intelligent systems powered by artificial intelligence and machine learning.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Enterprise-grade security to protect your digital assets.',
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What We Build
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-card p-8 hover:border-brand-teal/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-card bg-brand-teal/10 text-brand-teal mb-6 group-hover:bg-brand-teal/20 transition-colors">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="/services"
            className="inline-block px-8 py-4 rounded-pill bg-transparent border-2 border-brand-teal text-brand-teal font-semibold hover:bg-brand-teal hover:text-white transition-all duration-300"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
