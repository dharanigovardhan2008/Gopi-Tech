import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Brain, 
  Shield, 
  Cloud, 
  Database,
  Palette,
  Video,
  FileText,
  Presentation,
  Settings,
  HeadphonesIcon,
  Globe,
  Cpu,
  Lock,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const serviceCategories = [
    {
      category: 'Development Services',
      services: [
        {
          icon: Globe,
          title: 'Website Development',
          description: 'Custom, responsive, and scalable web applications built with modern frameworks'
        },
        {
          icon: Smartphone,
          title: 'Mobile App Development',
          description: 'Native iOS and Android applications with seamless user experiences'
        },
        {
          icon: Code2,
          title: 'Software Development',
          description: 'Enterprise-grade software solutions tailored to your business needs'
        },
        {
          icon: Cpu,
          title: 'API Development',
          description: 'RESTful and GraphQL APIs for seamless system integration'
        },
        {
          icon: Database,
          title: 'Database Management',
          description: 'Optimized database design, implementation, and maintenance'
        }
      ]
    },
    {
      category: 'Design & Creative',
      services: [
        {
          icon: Palette,
          title: 'UI/UX Design',
          description: 'Beautiful, intuitive interfaces that enhance user engagement'
        },
        {
          icon: Presentation,
          title: 'Logo & Branding',
          description: 'Professional brand identity and visual design services'
        },
        {
          icon: Video,
          title: 'Video Editing',
          description: 'Professional video editing for marketing and presentations'
        }
      ]
    },
    {
      category: 'Advanced Technology',
      services: [
        {
          icon: Brain,
          title: 'AI/ML Solutions',
          description: 'Intelligent systems powered by machine learning and artificial intelligence'
        },
        {
          icon: Cloud,
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure on AWS, Azure, and Google Cloud'
        },
        {
          icon: Shield,
          title: 'Cybersecurity Services',
          description: 'Enterprise-grade security audits and implementation'
        }
      ]
    },
    {
      category: 'Academic & Documentation',
      services: [
        {
          icon: BookOpen,
          title: 'Capstone Projects',
          description: 'Complete academic project development and documentation'
        },
        {
          icon: Presentation,
          title: 'PowerPoint Presentations',
          description: 'Professional presentation design and content creation'
        },
        {
          icon: FileText,
          title: 'Report Writing',
          description: 'Technical reports and documentation services'
        },
        {
          icon: FileText,
          title: 'Documentation Services',
          description: 'Comprehensive technical and user documentation'
        }
      ]
    },
    {
      category: 'Support & Consulting',
      services: [
        {
          icon: Settings,
          title: 'Website Maintenance',
          description: 'Ongoing support, updates, and performance optimization'
        },
        {
          icon: HeadphonesIcon,
          title: '24/7 Technical Support',
          description: 'Round-the-clock technical assistance and troubleshooting'
        },
        {
          icon: Lock,
          title: 'IT Consulting',
          description: 'Strategic technology consulting for business growth'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              End-to-end technology solutions for your business
            </p>
          </motion.div>

          {/* Service Categories */}
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center mb-8">
                <span className="px-6 py-2 bg-brand-teal/20 text-brand-tealLight font-semibold rounded-pill border border-brand-teal/30">
                  {category.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
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
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
              Ready to get started?
            </h2>
            <a href="/book-project">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill shadow-glow transition-all duration-300"
              >
                Book a Project
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
