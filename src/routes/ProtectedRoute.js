import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowed = [], children }) {
  const auth = useAuth();
  if (!auth.user) return <Navigate to="/login" replace />;
  if (!allowed.includes(auth.user.role)) return <Navigate to="/products" replace />;
  return children;
}
