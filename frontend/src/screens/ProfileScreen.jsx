import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>ProfileScreen</h2>
      <p>Name: {userInfo?.name}</p>
      <p>Email: {userInfo?.email}</p>
      <p>Admin: {userInfo?.isAdmin ? "Yes" : "No"}</p>
      <p>ID: {userInfo?._id}</p>
    </div>
  );
};

export default ProfileScreen;
