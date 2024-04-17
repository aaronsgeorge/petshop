import { FaCheck } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

const AdminUsers = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  return (
    <div className="mt-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && (
        <Table striped bordered hover>
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
        </Table>
      )}
    </div>
  );
};

export default AdminUsers;
