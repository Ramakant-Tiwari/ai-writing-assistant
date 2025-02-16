import { usePrivy } from "@privy-io/react-auth";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
