import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/DashboardLayout';
import { Briefcase, PlusCircle, User } from 'lucide-react';

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
  createdAt: any;
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    budget: '',
    description: '',
    deadline: ''
  });

  const services = [
    'Website Development',
    'Mobile App Development',
    'Software Development',
    'UI/UX Design',
    'Logo and Branding',
    'Video Editing',
    'AI/ML Solutions',
    'Cloud Solutions',
    'Cybersecurity Services',
    'API Development',
    'Database Management',
    'Capstone Project',
    'PowerPoint Presentation',
    'Report Writing',
    'Documentation',
    'Website Maintenance',
    'IT Consulting',
    '24/7 Support'
  ];

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyBookings = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'bookings'),
        where('clientId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const bookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setMyBookings(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        clientId: user?.uid || null,
        createdAt: serverTimestamp()
      });

      setFormData({
        name: '',
        email: '',
        mobile: '',
        service: '',
        budget: '',
        description: '',
        deadline: ''
      });

      fetchMyBookings();
      setActiveTab('bookings');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Briefcase },
    { id: 'new', label: 'New Booking', icon: PlusCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <DashboardLayout role="client">
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
        {activeTab === 'bookings' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">My Bookings</h2>
            
            {myBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-6">You haven't made any bookings yet.</p>
                <button
                  onClick={() => setActiveTab('new')}
                  className="px-8 py-3 bg-brand-teal hover:bg-brand-tealLight text-white font-semibold rounded-pill transition-all duration-300"
                >
                  Create New Booking
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-brand-card border border-brand-teal/10 rounded-card p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-100">{booking.service}</h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Budget:</span>
                        <span className="text-gray-300 ml-2">{booking.budget}</span>
                      </div>
                      {booking.deadline && (
                        <div>
                          <span className="text-gray-500">Deadline:</span>
                          <span className="text-gray-300 ml-2">{booking.deadline}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-400">{booking.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="bg-brand-secondary/30 rounded-card p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Create New Booking</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Mobile *</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Service *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100"
                  >
                    <option value="">Select service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Budget *</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    required
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100 placeholder-gray-500"
                    placeholder="$5,000"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-pill text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={6}
                  className="w-full px-6 py-3 bg-brand-secondary border border-brand-teal/20 rounded-[30px] text-gray-100 placeholder-gray-500 resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-10 py-4 bg-brand-teal hover:bg-brand-tealLight text-white font-bold rounded-pill shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Booking'}
              </button>
            </form>
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
