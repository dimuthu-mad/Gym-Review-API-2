import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const CreateReview = () => {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      setError("You must be logged in to create a review.");
      return;
    }

    if (!user || !rating || !comment) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      user,
      rating: Number(rating),
      comment,
    };

    try {
      setLoading(true);
      if (!id) throw new Error("Missing gym id");
      await axios.post(`http://localhost:3000/gyms/${id}/reviews`, payload, {
        withCredentials: true,
      });
      navigate(`/gyms/${id}`);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setIsAuthenticated(false);
        setError("You must be logged in to create a review.");
      } else {
        setError(err?.response?.data?.error || "Failed to create review");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-gym-container">
      <div className="create-gym-card">
        <h2 className="cg-title">Create Gym</h2>
        {error && <div className="cg-error">{error}</div>}

        {authChecking ? (
          <p>Checking sign-in status...</p>
        ) : !isAuthenticated ? (
          <div className="cg-signin">
            <h3>Sign in required</h3>
            <p>You need to be signed in to create a gym.</p>
            <div className="cg-actions">
              <a
                className="cg-btn cg-btn-primary"
                href="http://localhost:3000/login"
              >
                Sign in
              </a>
              <Link className="cg-btn cg-btn-ghost" to="/gyms">
                Back to gyms
              </Link>
            </div>
          </div>
        ) : (
          <form className="cg-form" onSubmit={handleSubmit}>
            <div className="cg-field">
              <label>User *</label>
              <input
                className="cg-input"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            <div className="cg-field">
              <label>Rating *</label>
              <input
                className="cg-input"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min={0}
                max={5}
                step={0.1}
              />
            </div>

            <div className="cg-field">
              <label>Comment *</label>
              <textarea
                className="cg-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="cg-actions">
              <button
                className="cg-btn cg-btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Review"}
              </button>
              <Link className="cg-btn cg-btn-ghost" to="/gyms">
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateReview;
