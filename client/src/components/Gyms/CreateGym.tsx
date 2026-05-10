import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div style={{ maxWidth: 600 }}>
      <h2>Create Gym</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Name *</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Location *</label>
          <br />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Rating (number)</label>
          <br />
          <input
            type="number"
            value={rating}
            onChange={(e) =>
              setRating(e.target.value === "" ? "" : Number(e.target.value))
            }
            min={0}
            max={5}
            step={0.1}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Membership Price (SEK)</label>
          <br />
          <input
            type="number"
            value={membershipPrice}
            onChange={(e) =>
              setMembershipPrice(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            min={0}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Gym"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGym;
