import { motion } from 'framer-motion';
import { Lightbulb, Layers, Lock, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: 'Leveraging the latest technologies to build future-ready solutions.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Built to grow with your business, from startup to enterprise.',
  },
  {
    icon: Lock,
    title: 'Secure Systems',
    description: 'Enterprise-grade security protecting your data and users.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Continuous Support',
    description: '24/7 technical support and maintenance for peace of mind.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-brand-secondary/30">
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
            Why Choose <span className="text-brand-tealLight">QuantumX</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your trusted partner in digital transformation
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-card p-6 hover:border-brand-teal/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-card bg-brand-teal/10 text-brand-teal mb-4 group-hover:bg-brand-teal/20 transition-colors">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
