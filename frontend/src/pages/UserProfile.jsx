import { useAuthContext } from "../context/AuthContext";
import useUserProfile from "../hooks/useUserProfile"; // Import the useUserProfile hook

const UserProfile = () => {
  const { authUser } = useAuthContext(); // Assuming you have a context for authentication
  const { loading, fetchUserProfile } = useUserProfile(); // Use the useUserProfile hook

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-blue-500 py-4">
        <div className="container mx-auto px-4">
          <div className="text-white font-bold text-2xl">Job Portal</div>
        </div>
      </nav>

      {/* User Profile Content */}
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : authUser && fetchUserProfile ? (
          <div>
            <p>
              <strong>Name:</strong> {fetchUserProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {fetchUserProfile.email}
            </p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <p>Please login to view your profile.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 py-8">
        <div className="container mx-auto px-4 text-center text-gray-100">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
