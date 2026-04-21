import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Portfolio {
  id: string;
  projectName: string;
  description: string;
  techStack: string[];
  category: string;
  liveLink: string;
  thumbnailURL?: string;
}

const WorksPage = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items: Portfolio[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Portfolio);
      });
      setPortfolio(items);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

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
              Our Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Projects we have built for our clients
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-pill border-4 border-solid border-brand-teal border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading portfolio...</p>
            </div>
          ) : portfolio.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No portfolio items yet. Admin can add projects from the dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/10 rounded-card overflow-hidden hover:border-brand-teal/30 hover:shadow-glow transition-all duration-300"
                >
                  {project.thumbnailURL && (
                    <div className="h-48 bg-brand-secondary overflow-hidden">
                      <img
                        src={project.thumbnailURL}
                        alt={project.projectName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-100">
                        {project.projectName}
                      </h3>
                      <span className="px-3 py-1 bg-brand-teal/20 text-brand-tealLight text-xs font-semibold rounded-pill border border-brand-teal/30">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-brand-secondary text-gray-300 text-xs rounded-pill border border-brand-teal/10"
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
                        className="inline-flex items-center gap-2 px-6 py-2 bg-brand-teal/20 hover:bg-brand-teal text-brand-tealLight hover:text-white font-semibold rounded-pill border border-brand-teal/30 transition-all duration-300"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
              Want your project featured here?
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

export default WorksPage;
