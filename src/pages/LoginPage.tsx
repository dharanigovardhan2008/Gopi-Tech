import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      
      // Wait for userData to be set
      setTimeout(() => {
        if (userData?.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (userData?.role === 'employee') {
          navigate('/dashboard/employee');
        } else if (userData?.role === 'client') {
          navigate('/dashboard/client');
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
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
                className="relative h-32"
              />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-400 mb-8">
            Access your QuantumX dashboard
          </p>

          {!showForm && (
            <motion.button
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill shadow-glow transition-all duration-300"
            >
              Login to Your Account
            </motion.button>
          )}
        </motion.div>

        {/* Login Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-brand-card/50 backdrop-blur-sm border border-brand-teal/10 rounded-section p-8"
            >
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-card flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <a href="#" className="text-brand-teal hover:text-brand-tealLight text-sm transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-bold rounded-pill shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <a href="/book-project" className="text-brand-teal hover:text-brand-tealLight transition-colors duration-300">
                    Book a project
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
