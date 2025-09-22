import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!user || !token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
