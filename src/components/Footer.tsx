import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 mb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/20 rounded-section shadow-soft p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="QuantumX Technologies" className="h-12 opacity-80" />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-brand-tealLight font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-slate-400 hover:text-brand-teal transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-400 hover:text-brand-teal transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/works" className="text-slate-400 hover:text-brand-teal transition-colors">
                    Our Works
                  </Link>
                </li>
                <li>
                  <Link to="/book-project" className="text-slate-400 hover:text-brand-teal transition-colors">
                    Book a Project
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-brand-tealLight font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Web Development</li>
                <li>Mobile App Development</li>
                <li>AI/ML Solutions</li>
                <li>Cloud Solutions</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-brand-tealLight font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-brand-teal" />
                  <span className="text-sm">info@quantumx.tech</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-teal" />
                  <span className="text-sm">+1 (234) 567-8900</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-teal" />
                  <span className="text-sm">Silicon Valley, CA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8 pt-8 border-t border-brand-teal/20">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-pill bg-brand-primary border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-pill bg-brand-primary border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Phone size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-pill bg-brand-primary border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 hover:scale-105"
            >
              <MapPin size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; {currentYear} QuantumX Technologies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
