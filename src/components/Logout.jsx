import React from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

const Logout = () => {
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("User signed out successfully");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
        // An error happened.
      });
  };

  return (
    <div>
      <button onClick={handleLogout} className="px-5 py-2 bg-red-600 text-white font-semibold rounded">Logout</button>
    </div>
  );
};

export default Logout;
