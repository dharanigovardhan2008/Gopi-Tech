import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/DashboardLayout';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';

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

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [myProjects, setMyProjects] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    assigned: 0,
    completed: 0,
    pending: 0
  });

  useEffect(() => {
    if (user) {
      fetchMyProjects();
    }
  }, [user]);

  const fetchMyProjects = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'bookings'),
        where('assignedTo', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const projects: Booking[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setMyProjects(projects);

      // Calculate stats
      const completed = projects.filter(p => p.status === 'completed').length;
      const pending = projects.filter(p => p.status === 'pending').length;

      setStats({
        assigned: projects.length,
        completed,
        pending
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', projectId), { status: newStatus });
      fetchMyProjects();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const tabs = [
    { id: 'projects', label: 'My Projects', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: CheckCircle }
  ];

  return (
    <DashboardLayout role="employee">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard label="Assigned Projects" value={stats.assigned} color="teal" />
        <StatCard label="Completed" value={stats.completed} color="green" />
        <StatCard label="Pending" value={stats.pending} color="yellow" />
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
        {activeTab === 'projects' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">My Assigned Projects</h2>
            
            {myProjects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No projects assigned yet.</p>
            ) : (
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-brand-card border border-brand-teal/10 rounded-card p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-100">{project.name}</h3>
                            <p className="text-gray-400 text-sm">{project.email}</p>
                          </div>
                          <StatusBadge status={project.status} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Service:</span>
                            <span className="text-gray-300 ml-2">{project.service}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <span className="text-gray-300 ml-2">{project.budget}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Mobile:</span>
                            <span className="text-gray-300 ml-2">{project.mobile}</span>
                          </div>
                          {project.deadline && (
                            <div>
                              <span className="text-gray-500">Deadline:</span>
                              <span className="text-gray-300 ml-2">{project.deadline}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-400">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <select
                          value={project.status}
                          onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                          className="px-4 py-2 bg-brand-secondary text-gray-300 rounded-pill border border-brand-teal/20 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        
                        {project.status !== 'completed' && (
                          <button
                            onClick={() => updateProjectStatus(project.id, 'completed')}
                            className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-pill border border-green-500/30 text-sm transition-all duration-300"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Profile Settings</h2>
            <p className="text-gray-400">Profile management coming soon...</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    teal: 'border-brand-teal/30 bg-brand-teal/10',
    green: 'border-green-500/30 bg-green-500/10',
    yellow: 'border-yellow-500/30 bg-yellow-500/10'
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
