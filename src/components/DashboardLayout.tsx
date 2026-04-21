import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { userData, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'employee':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'client':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-brand-teal/20 blur-2xl rounded-pill"></div>
            <img 
              src="/logo.png" 
              alt="QuantumX Technologies" 
              className="relative h-14"
            />
          </div>
        </motion.div>

        {/* Main Dashboard Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-brand-card to-brand-secondary border border-brand-teal/20 rounded-block p-6 md:p-12 shadow-glowStrong"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-brand-teal/10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
                Welcome, {userData?.name || 'User'}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1 text-sm font-semibold rounded-pill border ${getRoleBadgeColor(role)}`}>
                  {role.toUpperCase()}
                </span>
                <span className="text-gray-400 text-sm">
                  {userData?.email}
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold rounded-pill transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>

          {/* Dashboard Content */}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
