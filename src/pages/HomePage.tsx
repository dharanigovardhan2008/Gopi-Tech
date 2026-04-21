import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Smartphone, 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Lock,
  HeadphonesIcon,
  Palette,
  Cloud,
  Database,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const featuredServices = [
    {
      icon: Code2,
      title: 'Website Development',
      description: 'Custom, responsive, and scalable web applications'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications'
    },
    {
      icon: Brain,
      title: 'AI/ML Solutions',
      description: 'Intelligent systems powered by machine learning'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user experiences'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Enterprise-grade security implementations'
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Innovation Driven',
      description: 'Cutting-edge technology and modern development practices'
    },
    {
      icon: Database,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business needs'
    },
    {
      icon: Lock,
      title: 'Secure Systems',
      description: 'Industry-standard security protocols'
    },
    {
      icon: HeadphonesIcon,
      title: 'Continuous Support',
      description: '24/7 technical support and maintenance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-teal/20 blur-3xl rounded-pill"></div>
                <img 
                  src="/logo.png" 
                  alt="QuantumX Technologies" 
                  className="relative h-32 md:h-40"
                />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 tracking-wide">
              Engineering Intelligent
              <br />
              <span className="text-brand-tealLight">Digital Systems</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Enterprise-grade development. AI-powered solutions. Scalable digital infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill shadow-glow transition-all duration-300"
                >
                  Explore Services
                </motion.button>
              </Link>
              <Link to="/book-project">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-pill transition-all duration-300"
                >
                  Book a Project
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              What We Build
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive technology solutions for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/10 rounded-card p-8 hover:border-brand-teal/30 hover:shadow-glow transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-brand-teal mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-pill transition-all duration-300"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/10 rounded-card p-8 text-center hover:border-brand-teal/30 hover:shadow-glow transition-all duration-300"
              >
                <item.icon className="w-12 h-12 text-brand-teal mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Works Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              Our Works
            </h2>
            <p className="text-xl text-gray-400">
              Projects we've delivered for our clients
            </p>
          </motion.div>

          <div className="text-center mb-12">
            <p className="text-gray-400 text-lg">
              Portfolio items will be displayed here from the admin dashboard
            </p>
          </div>

          <div className="text-center">
            <Link to="/works">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-pill transition-all duration-300"
              >
                View All Works
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brand-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Ready to Build Something
              <br />
              <span className="text-brand-tealLight">Extraordinary?</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/book-project">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill shadow-glow transition-all duration-300"
                >
                  Book a Project
                </motion.button>
              </Link>
              <a href="https://wa.me/YOURNUMBER">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-pill transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
