import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ConnectionCard } from '../components/network/ConnectionCard';
import { Users, UserPlus, UserCheck } from 'lucide-react';

export function Network() {
  const [suggestions, setSuggestions] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      // Fetch connection suggestions
      const { data: suggestionsData } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', userData.user.id)
        .limit(10);

      // Fetch pending connections
      const { data: pendingData } = await supabase
        .from('connections')
        .select('*, profiles!connections_receiver_id_fkey(*)')
        .eq('sender_id', userData.user.id)
        .eq('status', 'pending');

      setSuggestions(suggestionsData || []);
      setPendingConnections(pendingData || []);
    }
    setLoading(false);
  };

  const handleConnect = async (profileId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      await supabase
        .from('connections')
        .insert([
          {
            sender_id: userData.user.id,
            receiver_id: profileId,
            status: 'pending',
          },
        ]);
      fetchConnections();
    }
  };

  const handleIgnore = async (profileId: string) => {
    setSuggestions(suggestions.filter((s: any) => s.id !== profileId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Manage network</h2>
            </div>
            <nav className="p-2">
              <a href="#connections" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <Users className="w-5 h-5 mr-2" />
                <span>Connections</span>
              </a>
              <a href="#pending" className="flex items-center p-2 hover:bg-gray-50 rounded">
                <UserPlus className="w-5 h-5 mr-2" />
                <span>Pending</span>
                {pendingConnections.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-blue-600 px-2 rounded-full text-sm">
                    {pendingConnections.length}
                  </span>
                )}
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <h1 className="text-2xl font-bold mb-4">People you may know</h1>
          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              suggestions.map((profile: any) => (
                <ConnectionCard
                  key={profile.id}
                  profile={profile}
                  onConnect={handleConnect}
                  onIgnore={handleIgnore}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}