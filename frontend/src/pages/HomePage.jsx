import { useContext } from "react";
import { authContext } from "../context/authContext";
import { formatDate } from "../utils/date";
const HomePage = () => {
  const { user, logout } = useContext(authContext);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="bg-zinc-900 text-white w-1/3 p-6 rounded-2xl">
      <h1 className="text-center text-3xl font-bold">Dashoard</h1>

      {/* user details */}
      <div className="bg-zinc-800 border-1 rounded-xl p-4 my-4">
        <h2 className="font-semibold text-xl">Profile Information</h2>
        <p className="text-sm">{user?.name}</p>
        <p className="text-sm">{user?.email}</p>
      </div>

      {/* account activity */}

      <div className="bg-zinc-800 border-1 rounded-xl p-4">
        <h2 className="font-semibold text-xl">Account Activity</h2>
        <p className="text-sm">
          <span className="font-bold">Joined: </span>
          {new Date(user?.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-sm">
          <span className="font-bold">Last Login: </span>
          {formatDate(user.lastLogin)}
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handleLogout}
          className="bg-zinc-700 px-6 py-3 rounded-md cursor-pointer hover:bg-zinc-800
          transition-colors duration-300
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
