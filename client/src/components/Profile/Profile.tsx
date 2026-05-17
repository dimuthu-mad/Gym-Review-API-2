import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

type UserProfile = {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
};

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          "http://localhost:3000/profile",
          {
            withCredentials: true,
          },
        );
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">Loading...</div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card profile-empty">
          <p className="profile-empty-text">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        {user.picture && (
          <img src={user.picture} alt="Profile" className="profile-picture" />
        )}
        <h2 className="profile-name">
          Name: {user.given_name || user.family_name || "Unknown"}{" "}
          {user.family_name && ` ${user.family_name}`}
        </h2>
        <h2 className="profile-name">Email: {user.email}</h2>
        {/* <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">Email: {user.email}</span>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
