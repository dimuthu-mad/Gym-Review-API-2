type User = {
  name: string;
};

type Gym = {
  id: number;
  name: string;
};

type Props = {
  user: User | null;
  gyms: Gym[];
};

function TestGymDashboard({ user, gyms }: Props) {
  return (
    <div>
      {!user ? <p>Not logged in</p> : <p>Welcome, {user.name}</p>}

      {user && (
        <form>
          <label htmlFor="gymName">Gym Name</label>
          <input id="gymName" />
          <button>Add Gym</button>
        </form>
      )}

      {gyms.length === 0 ? (
        <p>No gyms available</p>
      ) : (
        <ul>
          {gyms.map((gym) => (
            <li key={gym.id}>{gym.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestGymDashboard;
