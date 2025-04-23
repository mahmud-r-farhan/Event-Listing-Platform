import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    location: '',
    website: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    interests: [],
    phoneNumber: '',
    notificationPreferences: {
      email: true,
      push: true
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProfile(res.data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 max-w-2xl"
    >
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={profile.username}
              onChange={(e) => setProfile({...profile, username: e.target.value})}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Bio</span>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </label>

          {/* Add more form fields for other profile information */}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Profile;
