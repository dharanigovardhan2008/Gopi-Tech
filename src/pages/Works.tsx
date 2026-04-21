import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { getAllPortfolio, Portfolio } from '../lib/firestore';

const Works = () => {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllPortfolio();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
            Our <span className="text-brand-tealLight">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Projects we have built for our clients. Each one crafted with precision and innovation.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-slate-400 py-20">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-card p-12 max-w-md mx-auto">
              <p className="text-slate-400 mb-6">
                No projects available yet. Check back soon!
              </p>
              <a
                href="/book-project"
                className="inline-block px-8 py-4 rounded-pill bg-brand-teal text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300"
              >
                Be Our First Client
              </a>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-card p-6 hover:border-brand-teal/50 hover:shadow-glow transition-all duration-300"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-4 py-1.5 rounded-pill bg-brand-teal/10 text-brand-teal text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.projectName}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-pill bg-brand-primary/50 text-brand-tealLight text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-transparent border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    View Project
                    <ExternalLink size={16} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-brand-card to-brand-secondary border border-brand-teal/20 rounded-section p-12 shadow-glow">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to see your project here?
              </h2>
              <p className="text-slate-400 mb-8">
                Let's work together to create something amazing
              </p>
              <a
                href="/book-project"
                className="inline-block px-8 py-4 rounded-pill bg-brand-teal text-white font-semibold shadow-glow hover:shadow-glowStrong hover:scale-105 transition-all duration-300"
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Works;
