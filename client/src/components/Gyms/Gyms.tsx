import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Gyms.css";

type gymsProfile = {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  membershipPrice: number;
};

const GymData = () => {
  const [gyms, setGyms] = useState<gymsProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get<gymsProfile[]>(
          "http://localhost:3000/gyms",
          {
            withCredentials: true,
          },
        );
        setGyms(response.data);
      } catch (error) {
        setGyms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, []);

  if (loading) {
    return <div className="gyms-loading">Loading...</div>;
  }
  // show still the page even if empty so form is available
  // if (gyms.length === 0) {
  //   return <div>No gym data available.</div>;
  // }

  return (
    <div className="gyms-page">
      <div className="gyms-card">
        <div className="gyms-header">
          <h1>Gym Data</h1>
        </div>

        {gyms.length === 0 ? (
          <p className="gyms-empty">No gym data available.</p>
        ) : (
          <div className="gyms-table-wrap">
            <table className="gyms-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th>Membership Price (SEK)</th>
                  <th>Create Review</th>
                </tr>
              </thead>
              <tbody>
                {gyms.map((gym) => (
                  <tr key={gym.id}>
                    <td>
                      <Link to={`/gyms/${gym.id}`}>{gym.id}</Link>
                    </td>
                    <td>
                      <Link to={`/gyms/${gym.id}`}>{gym.name}</Link>
                    </td>
                    <td>{gym.location}</td>
                    <td>{gym.rating}</td>
                    <td>{gym.membershipPrice.toFixed(2)}</td>
                    <td>
                      <Link to={`/gyms/${gym.id}/reviews`}>Create Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GymData;
