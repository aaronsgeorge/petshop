import { FaCheck, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, Button } from "react-bootstrap";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

const AdminUsers = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  return (
    <div className="mt-3">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && (
        <Table striped hover responsive className="table-style">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin && <FaCheck />}</td>
                <td className="text-nowrap">
                  <Button
                    size="sm"
                    variant="light"
                    className="me-2"
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="text-primary"
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminUsers;
