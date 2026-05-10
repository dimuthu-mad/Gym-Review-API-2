import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CreateGym.css";

const CreateGym = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [membershipPrice, setMembershipPrice] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [notAuthenticated, setNotAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !location) {
      setError("Name and location are required.");
      return;
    }

    const payload = {
      name,
      location,
      description,
      rating: typeof rating === "number" ? rating : undefined,
      membershipPrice:
        typeof membershipPrice === "number" ? membershipPrice : undefined,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/gyms", payload, {
        withCredentials: true,
      });
      navigate("/gyms");
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setNotAuthenticated(true);
        setError("You must be logged in to create a gym.");
      } else {
        setError(err?.response?.data?.error || "Failed to create gym");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-gym-container">
      <div className="create-gym-card">
        <h2 className="cg-title">Create Gym</h2>
        {/* {error && <div className="cg-error">{error}</div>} */}

        {notAuthenticated ? (
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
              <label>Name *</label>
              <input
                className="cg-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="cg-field">
              <label>Location *</label>
              <input
                className="cg-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="cg-field">
              <label>Description</label>
              <textarea
                className="cg-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="cg-field">
              <label>Rating (number)</label>
              <input
                className="cg-input"
                type="number"
                value={rating}
                onChange={(e) =>
                  setRating(e.target.value === "" ? "" : Number(e.target.value))
                }
                min={0}
                max={5}
                step={0.1}
              />
            </div>

            <div className="cg-field">
              <label>Membership Price (SEK)</label>
              <input
                className="cg-input"
                type="number"
                value={membershipPrice}
                onChange={(e) =>
                  setMembershipPrice(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                min={0}
              />
            </div>

            <div className="cg-actions">
              <button
                className="cg-btn cg-btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Gym"}
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

export default CreateGym;
