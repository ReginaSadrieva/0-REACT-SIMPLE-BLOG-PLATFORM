// ------------------------------------------------------------------
// Purpose: Protected route for authenticated users only.
//          Redirect to /sign-in if not logged in.
// ------------------------------------------------------------------

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}
