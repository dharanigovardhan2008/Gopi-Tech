import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Our Works', path: '/works' },
    { name: 'Book Project', path: '/book-project' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[900px] px-4"
      >
        <div className="bg-brand-primary/85 backdrop-blur-xl border border-brand-teal/20 rounded-pill shadow-glow px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="QuantumX Technologies" className="h-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-400 hover:text-brand-teal transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Button */}
            <div className="hidden md:block">
              {user && userData ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={`/dashboard/${userData.role}`}
                    className="px-5 py-2 rounded-pill bg-transparent border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-pill bg-transparent border border-slate-500 text-slate-400 hover:bg-slate-500 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-pill bg-transparent border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-teal"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-[400px] px-4 md:hidden"
          >
            <div className="bg-brand-card/95 backdrop-blur-xl border border-brand-teal/20 rounded-card shadow-glow p-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-400 hover:text-brand-teal transition-colors duration-300 text-base font-medium py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-brand-teal/20">
                  {user && userData ? (
                    <>
                      <Link
                        to={`/dashboard/${userData.role}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full px-5 py-3 rounded-pill bg-brand-teal text-white text-center font-medium mb-3"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full px-5 py-3 rounded-pill bg-transparent border border-slate-500 text-slate-400 text-center font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-5 py-3 rounded-pill bg-brand-teal text-white text-center font-medium"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
