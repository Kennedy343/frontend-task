// src/pages/Login.tsx
import { useState, useContext } from 'react';
import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import type { User } from '../types/types';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Respuesta backend login:', data);

      if (res.ok) {
        // IMPORTANTE: tu backend devuelve access_token
        login(data.access_token, data.user as User);
        navigate('/tasks');
      } else {
        setError(data.message || 'Error en login');
      }
    } catch (err: any) {
      setError(err.message || 'Error en login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error" align="center">{error}</Typography>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-500">
              Regístrate
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
