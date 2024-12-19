import React from "react";
import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center text-white justify-between p-3 bg-sky-700">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-2 bg-zinc-300 rounded-md" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
