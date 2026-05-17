import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-container">
      <div className="home-card">
        <h1 className="home-badge">Welcome</h1>
        <h1 className="home-title">Find the right gym and share your review</h1>
        {/* <p className="home-subtitle">
          Browse local gyms, check details and ratings, and help others by
          posting your own experience.
        </p> */}

        <div className="home-actions">
          <Link to="/gyms" className="home-btn home-btn-primary">
            Explore Gyms
          </Link>
          <Link to="/gyms/create" className="home-btn home-btn-secondary">
            Create Gym
          </Link>
          <Link to="/profile" className="home-btn home-btn-ghost">
            View Profile
          </Link>
        </div>

        <div className="home-grid">
          <article className="home-feature">
            <h3>Browse Fast</h3>
            <p>Open any gym and quickly view location, price, and rating.</p>
          </article>
          <article className="home-feature">
            <h3>Read Reviews</h3>
            <p>See real feedback from members before you decide.</p>
          </article>
          <article className="home-feature">
            <h3>Contribute</h3>
            <p>Add a gym and share your review to help the community.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Home;
