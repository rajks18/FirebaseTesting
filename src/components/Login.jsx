import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import app from "../firebase/firebase.config";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Login Succesfull");
        navigate("/");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Invalid user email or password! Please type correct one.");
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
       console.log("Google sign-in Successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log("Google sign-in Failed:", error);
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Please Login</h2>

        {/* login form */}
        <form onSubmit={handleLogin} className="space-y-4">
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

          {error && <p className="text-sm italic text-red-500">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 py-2">
            Login
          </button>
        </form>

        {/* social login */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">Or login with</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleGoogleLogin} className="flex items-center px-4 py-2 space-x-2 bg-red-500 text-white rounded hover:bg-red-600">
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

        {/* texts */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account? Please{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
