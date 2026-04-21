import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Briefcase, 
  CheckCircle, 
  Users, 
  FolderOpen,
  Trash2,
  Edit,
  UserCog 
} from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  mobile: string;
  service: string;
  budget: string;
  description: string;
  deadline: string;
  status: string;
  assignedTo?: string;
  createdAt: any;
}

interface Portfolio {
  id: string;
  projectName: string;
  description: string;
  techStack: string[];
  category: string;
  liveLink: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalEmployees: 0
  });

  // Portfolio form state
  const [newPortfolio, setNewPortfolio] = useState({
    projectName: '',
    description: '',
    techStack: '',
    category: '',
    liveLink: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch bookings
      const bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsData: Booking[] = [];
      bookingsSnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(bookingsData);

      // Fetch portfolio
      const portfolioSnapshot = await getDocs(collection(db, 'portfolio'));
      const portfolioData: Portfolio[] = [];
      portfolioSnapshot.forEach((doc) => {
        portfolioData.push({ id: doc.id, ...doc.data() } as Portfolio);
      });
      setPortfolio(portfolioData);

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: User[] = [];
      usersSnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(usersData);

      // Calculate stats
      const activeBookings = bookingsData.filter(b => b.status === 'in-progress').length;
      const completed = bookingsData.filter(b => b.status === 'completed').length;
      const employees = usersData.filter(u => u.role === 'employee').length;

      setStats({
        totalBookings: bookingsData.length,
        activeProjects: activeBookings,
        completedProjects: completed,
        totalEmployees: employees
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
        fetchData();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const addPortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'portfolio'), {
        ...newPortfolio,
        techStack: newPortfolio.techStack.split(',').map(t => t.trim()),
        createdAt: serverTimestamp()
      });
      setNewPortfolio({
        projectName: '',
        description: '',
        techStack: '',
        category: '',
        liveLink: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error adding portfolio item:', error);
    }
  };

  const deletePortfolioItem = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await deleteDoc(doc(db, 'portfolio', itemId));
        fetchData();
      } catch (error) {
        console.error('Error deleting portfolio item:', error);
      }
    }
  };

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <DashboardLayout role="admin">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Total Bookings" 
          value={stats.totalBookings} 
          color="blue" 
        />
        <StatCard 
          label="Active Projects" 
          value={stats.activeProjects} 
          color="teal" 
        />
        <StatCard 
          label="Completed" 
          value={stats.completedProjects} 
          color="green" 
        />
        <StatCard 
          label="Employees" 
          value={stats.totalEmployees} 
          color="purple" 
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-pill transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-teal text-white shadow-glow'
                  : 'bg-brand-secondary text-gray-400 hover:text-brand-teal border border-brand-teal/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">All Bookings</h2>
            
            {bookings.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-brand-card border border-brand-teal/10 rounded-card p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-100">{booking.name}</h3>
                            <p className="text-gray-400 text-sm">{booking.email}</p>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Service:</span>
                            <span className="text-gray-300 ml-2">{booking.service}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <span className="text-gray-300 ml-2">{booking.budget}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Mobile:</span>
                            <span className="text-gray-300 ml-2">{booking.mobile}</span>
                          </div>
                          {booking.deadline && (
                            <div>
                              <span className="text-gray-500">Deadline:</span>
                              <span className="text-gray-300 ml-2">{booking.deadline}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-400 mt-3">{booking.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="px-4 py-2 bg-brand-secondary text-gray-300 rounded-pill border border-brand-teal/20 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-pill border border-red-500/30 transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {/* Add New Portfolio Form */}
            <div className="bg-brand-secondary/30 rounded-card p-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Add New Project</h2>
              
              <form onSubmit={addPortfolioItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={newPortfolio.projectName}
                    onChange={(e) => setNewPortfolio({...newPortfolio, projectName: e.target.value})}
                    required
                    className="px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newPortfolio.category}
                    onChange={(e) => setNewPortfolio({...newPortfolio, category: e.target.value})}
                    required
                    className="px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                  />
                </div>
                
                <textarea
                  placeholder="Description"
                  value={newPortfolio.description}
                  onChange={(e) => setNewPortfolio({...newPortfolio, description: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-[30px] text-gray-100 placeholder-gray-500"
                />
                
                <input
                  type="text"
                  placeholder="Tech Stack (comma-separated)"
                  value={newPortfolio.techStack}
                  onChange={(e) => setNewPortfolio({...newPortfolio, techStack: e.target.value})}
                  required
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                />
                
                <input
                  type="url"
                  placeholder="Live Link"
                  value={newPortfolio.liveLink}
                  onChange={(e) => setNewPortfolio({...newPortfolio, liveLink: e.target.value})}
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                />
                
                <button
                  type="submit"
                  className="px-8 py-3 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill transition-all duration-300"
                >
                  Add Project
                </button>
              </form>
            </div>

            {/* Portfolio List */}
            <div className="bg-brand-secondary/30 rounded-card p-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Portfolio Items</h2>
              
              {portfolio.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No portfolio items yet.</p>
              ) : (
                <div className="space-y-4">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="bg-brand-card border border-brand-teal/10 rounded-card p-6 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2">{item.projectName}</h3>
                        <p className="text-gray-400 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-brand-secondary text-gray-300 text-xs rounded-pill"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {item.liveLink && (
                          <a
                            href={item.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-teal hover:text-brand-tealLight text-sm"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      
                      <button
                        onClick={() => deletePortfolioItem(item.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-pill border border-red-500/30 transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">User Management</h2>
            
            {users.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No users found.</p>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-brand-card border border-brand-teal/10 rounded-card p-6 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-100">{user.name}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 text-sm font-semibold rounded-pill ${
                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        user.role === 'employee' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// Helper Components
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/10',
    teal: 'border-brand-teal/30 bg-brand-teal/10',
    green: 'border-green-500/30 bg-green-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10'
  };

  return (
    <div className={`border ${colorClasses[color]} rounded-card p-6 text-center`}>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-100">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusClasses: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30'
  };

  return (
    <span className={`px-4 py-1 text-sm font-semibold rounded-pill border ${statusClasses[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
      {status}
    </span>
  );
}
