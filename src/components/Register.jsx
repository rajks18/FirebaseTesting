import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import app from "../firebase/firebase.config";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        alert("Registration Succesfull");
        navigate("/login");
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Please Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 py-2">
            Sign Up
          </button>
        </form>

        {/* social login */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">Or signup with</p>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center px-4 py-2 space-x-2 bg-red-500 text-white rounded hover:bg-red-600">
              <FaGoogle />
              <span>Google</span>
            </button>
            <button className="flex items-center px-4 py-2 space-x-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <FaFacebook />
              <span>Facebook</span>
            </button>
            <button className="flex items-center px-4 py-2 space-x-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              <FaGithub />
              <span>Github</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account? Please{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
