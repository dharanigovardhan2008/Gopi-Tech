import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { userData, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-teal/20 blur-3xl rounded-full" />
            <img src="/logo.png" alt="QuantumX Technologies" className="relative h-14" />
          </div>
        </motion.div>

        {/* Main Dashboard Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-brand-card to-brand-secondary border border-brand-teal/20 rounded-block shadow-glowStrong p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-brand-teal/20">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {userData?.name || 'User'}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-pill bg-brand-teal/10 border border-brand-teal/30 text-brand-tealLight text-sm font-medium capitalize">
                  {userData?.role || 'User'}
                </span>
                <span className="text-slate-400 text-sm">{userData?.email}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-pill bg-transparent border border-slate-500 text-slate-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Content */}
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
