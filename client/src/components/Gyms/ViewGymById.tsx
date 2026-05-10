import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ViewGymById.css";

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

  if (loading)
    return (
      <div className="view-gym-container">
        <div className="view-gym-card">Loading gym details...</div>
      </div>
    );
  if (error)
    return (
      <div className="view-gym-container">
        <div className="view-gym-card vg-error">{error}</div>
      </div>
    );
  if (!gym)
    return (
      <div className="view-gym-container">
        <div className="view-gym-card">Gym not found.</div>
      </div>
    );

  return (
    <div className="view-gym-container">
      <div className="view-gym-card">
        <p className="vg-back">
          <Link to="/gyms" className="vg-back-link">
            ← Back to gyms
          </Link>
        </p>
        <h1 className="vg-title">{gym.name}</h1>

        <div className="vg-field">
          <span className="vg-label">Location:</span>
          <span className="vg-value">{gym.location}</span>
        </div>

        <div className="vg-field">
          <span className="vg-label">Description:</span>
          <span className="vg-value">{gym.description}</span>
        </div>

        <div className="vg-field">
          <span className="vg-label">Rating:</span>
          <span className="vg-value">{gym.rating}</span>
        </div>

        <div className="vg-field">
          <span className="vg-label">Membership Price:</span>
          <span className="vg-value">{gym.membershipPrice} SEK</span>
        </div>

        <h2 className="vg-subtitle">Reviews</h2>
        {gym.reviews.length === 0 ? (
          <p className="vg-no-reviews">No reviews yet.</p>
        ) : (
          <ul className="vg-reviews">
            {gym.reviews.map((review) => (
              <li key={review.id} className="vg-review-item">
                <div className="vr-header">
                  <strong>{review.user}</strong>
                  <span className="vr-rating">{` (${review.rating}/5)`}</span>
                </div>
                <div className="vr-comment">{review.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewGymById;
