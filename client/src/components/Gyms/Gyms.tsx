import { useState, useEffect } from "react";
import axios from "axios";

type gymsProfile = {
  id: number;
  name: string;
  location: string;
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
      <h1>Gym Data</h1>
      {gyms.map((gym) => (
        <div key={gym.id}>
          <h3>Name: {gym.name}</h3>
          <h3>Location: {gym.location}</h3>
        </div>
      ))}
    </div>
  );
};

export default GymData;
