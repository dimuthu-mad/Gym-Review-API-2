import { useState, useEffect } from "react";
import axios from "axios";

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
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>Name: {user.given_name || user.family_name}</h2>
      {user.picture && (
        <img
          src={user.picture}
          alt="Profile"
          style={{ width: "100px", borderRadius: "50%" }}
        />
      )}
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
