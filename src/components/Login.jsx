import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [showModal, setShowModal] = useState(false); 
  const passwordRef = useRef(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password.length < 6){
        setError('Password must be at least 6 characters');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}api/auth/login`, { name, email, password });
      const { token, username, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", username);

      setSuccessMessage(message === "Login" ? "Logged in successfully!" : "Signed up successfully!");
      setShowModal(true); 

      setTimeout(() => {
        navigate("/home"); 
      }, 2000);  

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    const currentPos = passwordRef.current.selectionStart; 
    setShowPassword(!showPassword);
    setTimeout(() => {
      passwordRef.current.selectionStart = currentPos; 
      passwordRef.current.selectionEnd = currentPos; 
      passwordRef.current.focus(); 
    }, 0);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/Background.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-amber-100 p-8 rounded-lg shadow-lg w-full max-w-sm m-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Sign Up</h2>

        {/* Show error message if there is any */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Rahul"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Use a dummy email..."
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                ref={passwordRef} 
                type={showPassword ? "text" : "password"} 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In / Sign Up
          </button>
        </form>
      </div>

      {/* Modal for success message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{successMessage}</h2>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;