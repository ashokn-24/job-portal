import { useAuthContext } from "../context/AuthContext";
import useUserProfile from "../hooks/useUserProfile"; // Import the useUserProfile hook

const UserProfile = () => {
  const { authUser } = useAuthContext(); // Assuming you have a context for authentication
  const { loading, userProfile } = useUserProfile(); // Use the useUserProfile hook

  return (
    <div className="bg-gray-100">
      {/* User Profile Content */}
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : authUser && userProfile ? (
          <div>
            <p>
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Role:</strong> {userProfile.role}
            </p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <p>Please login to view your profile.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
