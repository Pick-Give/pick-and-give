import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Gift, Calendar, Award, LogOut, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from '@/components/DarkModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import StatsCard from '@/components/dashboard/StatsCard';
import DonationStatusTimeline from '@/components/dashboard/DonationStatusTimeline';
import EcoPointsChart from '@/components/dashboard/EcoPointsChart';
import NotificationPanel from '@/components/dashboard/NotificationPanel';
import ProfileCard from '@/components/dashboard/ProfileCard';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import SchedulePickupModal from '@/components/dashboard/SchedulePickupModal';

interface Profile {
  id: string;
  full_name: string;
  phone_number: string;
  total_eco_points: number;
}

interface Donation {
  id: string;
  item_name: string;
  category: string;
  description: string;
  status: string;
  eco_points: number;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [schedulePickupOpen, setSchedulePickupOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchDonations();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const fetchDonations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching donations:', error);
    } else {
      setDonations(data || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'picked_up': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredDonations = donations.filter(donation => {
    const matchesFilter = filter === 'all' || donation.status === filter;
    const matchesSearch = donation.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const verifiedDonations = donations.filter(d => d.status === 'verified');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/lovable-uploads/e10aac0e-a4f9-44c5-8074-af7e5a6d42e0.png" alt="Pick & Give" className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">{t('dashboard.title')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t('dashboard.ecoPoints')}: </span>
                <span className="text-green-600 dark:text-green-400 font-bold">{profile?.total_eco_points || 0}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.welcome')}, {profile?.full_name}
              </span>
              <NotificationPanel />
              <LanguageSelector />
              <DarkModeToggle />
              <Button variant="outline" onClick={handleSignOut} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="mb-8">
          <ProfileCard 
            fullName={profile?.full_name || ''} 
            email={user?.email}
            totalEcoPoints={profile?.total_eco_points || 0}
            profile={profile}
            onProfileUpdate={fetchProfile}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title={t('dashboard.totalDonations')}
            value={donations.length}
            icon={Gift}
            onClick={() => setFilter('all')}
          />
          <StatsCard
            title={t('dashboard.ecoPoints')}
            value={profile?.total_eco_points || 0}
            icon={Award}
            onClick={() => {/* Open eco-points breakdown modal */}}
          />
          <StatsCard
            title={t('dashboard.verifiedItems')}
            value={verifiedDonations.length}
            icon={Calendar}
            onClick={() => setFilter('verified')}
          />
        </div>

        {/* Charts and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EcoPointsChart donations={donations} />
          <LeaderboardCard />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">{t('dashboard.quickActions')}</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/donate')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('dashboard.newDonation')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSchedulePickupOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t('dashboard.schedulePickup')}
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Donations List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.yourDonations')}</CardTitle>
            <CardDescription>
              Track the status of your donated items
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredDonations.length === 0 ? (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {donations.length === 0 ? t('dashboard.noDonations') : 'No matching donations'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {donations.length === 0 ? t('dashboard.noDonationsText') : 'Try adjusting your search or filter criteria.'}
                </p>
                {donations.length === 0 && (
                  <Button onClick={() => navigate('/donate')} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard.makeFirstDonation')}
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDonations.map((donation) => (
                  <div key={donation.id} className="flex flex-col p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer dark:border-gray-700 dark:hover:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium dark:text-white">{donation.item_name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{donation.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(donation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status.replace('_', ' ')}
                        </Badge>
                        {donation.eco_points > 0 && (
                          <Badge variant="outline" className="text-green-600 dark:text-green-400">
                            +{donation.eco_points} pts
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DonationStatusTimeline 
                      status={donation.status} 
                      createdAt={donation.created_at} 
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SchedulePickupModal
        open={schedulePickupOpen}
        onOpenChange={setSchedulePickupOpen}
      />
    </div>
  );
};

export default Dashboard;
