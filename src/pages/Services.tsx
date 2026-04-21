import { motion } from 'framer-motion';
import { 
  Code, Smartphone, Palette, Brain, Cloud, Shield, 
  Database, Cpu, FileText, Headphones, Search, Video 
} from 'lucide-react';

const serviceCategories = [
  {
    category: 'Development Services',
    services: [
      {
        icon: Code,
        title: 'Website Development',
        description: 'Custom websites and web applications built with modern frameworks like React, Next.js, and Vue.',
      },
      {
        icon: Smartphone,
        title: 'Mobile App Development',
        description: 'Native iOS and Android applications with seamless performance and beautiful design.',
      },
      {
        icon: Cpu,
        title: 'Software Development',
        description: 'Enterprise software solutions tailored to your business requirements.',
      },
      {
        icon: Code,
        title: 'API Development and Integration',
        description: 'RESTful and GraphQL APIs with third-party service integrations.',
      },
      {
        icon: Database,
        title: 'Database Management',
        description: 'Database design, optimization, and management for scalable applications.',
      },
    ],
  },
  {
    category: 'Design and Creative',
    services: [
      {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'User-centered design creating intuitive and engaging digital experiences.',
      },
      {
        icon: Palette,
        title: 'Logo and Branding',
        description: 'Professional brand identity design that makes your business stand out.',
      },
      {
        icon: Video,
        title: 'Video Editing',
        description: 'Professional video editing for marketing, tutorials, and promotional content.',
      },
    ],
  },
  {
    category: 'Advanced Technology',
    services: [
      {
        icon: Brain,
        title: 'AI/ML Solutions',
        description: 'Intelligent systems powered by artificial intelligence and machine learning.',
      },
      {
        icon: Cloud,
        title: 'Cloud Solutions',
        description: 'Cloud infrastructure, deployment, and management on AWS, Azure, and GCP.',
      },
      {
        icon: Shield,
        title: 'Cybersecurity Services',
        description: 'Comprehensive security audits, penetration testing, and protection systems.',
      },
    ],
  },
  {
    category: 'Academic and Documentation',
    services: [
      {
        icon: FileText,
        title: 'Capstone Projects',
        description: 'Complete capstone project development and documentation for students.',
      },
      {
        icon: FileText,
        title: 'PowerPoint Presentations',
        description: 'Professional presentation design for business and academic purposes.',
      },
      {
        icon: FileText,
        title: 'Report Writing',
        description: 'Technical reports, documentation, and research papers.',
      },
      {
        icon: FileText,
        title: 'Documentation Services',
        description: 'API documentation, user guides, and technical manuals.',
      },
    ],
  },
  {
    category: 'Support and Consulting',
    services: [
      {
        icon: Search,
        title: 'Website Maintenance',
        description: 'Ongoing maintenance, updates, and optimization for your digital assets.',
      },
      {
        icon: Headphones,
        title: '24/7 Technical Support',
        description: 'Round-the-clock technical support for your applications and systems.',
      },
      {
        icon: Headphones,
        title: 'IT Consulting',
        description: 'Strategic technology consulting to guide your digital transformation.',
      },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-brand-tealLight">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            End-to-end technology solutions for your business. From development to deployment, we've got you covered.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Badge */}
              <div className="flex justify-center mb-8">
                <span className="px-6 py-2 rounded-pill bg-brand-teal/10 border border-brand-teal/30 text-brand-tealLight font-semibold">
                  {category.category}
                </span>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={serviceIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="group bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-card p-6 hover:border-brand-teal/50 hover:shadow-glow transition-all duration-300"
                    >
                      <div className="flex flex-col">
                        <div className="p-3 rounded-card bg-brand-teal/10 text-brand-teal mb-4 w-fit group-hover:bg-brand-teal/20 transition-colors">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
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
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-slate-400 mb-6">
            Ready to start your project?
          </p>
          <a
            href="/book-project"
            className="inline-block px-8 py-4 rounded-pill bg-brand-teal text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300"
          >
            Book a Project
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
