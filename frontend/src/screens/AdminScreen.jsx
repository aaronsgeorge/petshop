import { FaCheck } from "react-icons/fa";
import { useGetUsersQuery } from "../slices/usersApiSlice";

const AdminScreen = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin && <FaCheck />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminScreen;
