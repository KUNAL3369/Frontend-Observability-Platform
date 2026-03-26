import { useAuthStore } from "../../features/auth/authStore";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-gray-400">
      Loading...
    </div>
  );
}

if (!user) return <Navigate to="/login" />;

  return children;
}