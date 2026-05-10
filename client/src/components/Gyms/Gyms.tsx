import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    return <div>Loading...</div>;
  }
  if (gyms.length === 0) {
    return <div>No gym data available.</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Gym Data</h1>
        <Link to="/gyms/create"><button>Create Gym</button></Link>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Location
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Membership Price(Sek)
            </th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((gym) => (
            <tr key={gym.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link to={`/gyms/${gym.id}`}>{gym.id}</Link>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link to={`/gyms/${gym.id}`}>{gym.name}</Link>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {gym.location}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {gym.rating}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {gym.membershipPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GymData;
