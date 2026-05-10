import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
};

type GymDetails = {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  membershipPrice: number;
  reviews: Review[];
};

const ViewGymById = () => {
  const { id } = useParams();
  const [gym, setGym] = useState<GymDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await axios.get<GymDetails>(
          `http://localhost:3000/gyms/${id}`,
          { withCredentials: true },
        );
        setGym(response.data);
      } catch (err) {
        setError("Gym not found or failed to load.");
        setGym(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGym();
  }, [id]);

  if (loading) return <div>Loading gym details...</div>;
  if (error) return <div>{error}</div>;
  if (!gym) return <div>Gym not found.</div>;

  return (
    <div>
      <p>
        <Link to="/gyms">Back to gyms</Link>
      </p>
      <h1>{gym.name}</h1>
      <p>
        <strong>Location:</strong> {gym.location}
      </p>
      <p>
        <strong>Description:</strong> {gym.description}
      </p>
      <p>
        <strong>Rating:</strong> {gym.rating}
      </p>
      <p>
        <strong>Membership Price:</strong> {gym.membershipPrice} SEK
      </p>

      <h2>Reviews</h2>
      {gym.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {gym.reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.user}</strong> ({review.rating}/5):{" "}
              {review.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewGymById;
