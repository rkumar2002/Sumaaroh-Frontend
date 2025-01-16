import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  // State to store user info and preferences
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const [preferences, setPreferences] = useState({
    guestSize: "",
    venues: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch user details (name and email)
        const userDetailsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/user-details`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const { name, email } = userDetailsResponse.data;
        setUserInfo({ name, email });

        // Fetch user preferences (guest size and venues)
        const preferencesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/preferences`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const { guestSize, venues } = preferencesResponse.data;
        setPreferences({ guestSize, venues });
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-8 font-serif bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Background.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-blue-500 font-semibold hover:text-blue-700"
        >
          &#8592; Back to Home
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-4xl font-bold text-blue-600 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600 lg:text-lg">Welcome to your profile</p>
        </div>

        {/* User Info Section */}
        <div className="mb-8">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-8">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
            Preferences
          </h2>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Guest Size:</strong>{" "}
              {preferences.guestSize.length === 0
                ? <span className="text-gray-400">No guest size preference set yet</span>
                : preferences.guestSize}
            </p>
            <p className="text-gray-700">
              <strong>Venues:</strong>
              {preferences.venues.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1">
                  {preferences.venues.map((venue, index) => (
                    <li key={index} className="text-gray-700">
                      {venue}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400"> No venue preference set yet</span> // Message when no venues are set
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
