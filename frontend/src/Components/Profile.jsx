// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await getUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      alert('Profile updated');
    } catch (error) {
      alert('Update failed: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Name" />
      <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;