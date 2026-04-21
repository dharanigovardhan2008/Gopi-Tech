import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { getAllPortfolio, Portfolio } from '../lib/firestore';

const WorksPreview = () => {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllPortfolio();
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-slate-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

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
            Our Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Showcasing successful projects we've built for our clients
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              <div className="mb-4">
                <span className="px-4 py-1.5 rounded-pill bg-brand-teal/10 text-brand-teal text-xs font-medium">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {project.projectName}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-pill bg-brand-primary/50 text-brand-tealLight text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="/works"
            className="inline-block px-8 py-4 rounded-pill bg-transparent border-2 border-brand-teal text-brand-teal font-semibold hover:bg-brand-teal hover:text-white transition-all duration-300"
          >
            View All Works
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksPreview;
