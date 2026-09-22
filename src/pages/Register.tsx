// src/pages/Register.tsx
// Corregido
import { useState, useContext } from 'react';
import type { FC, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import type { User } from '../types/types';

const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user as User);
        navigate('/tasks');
      } else {
        setError(data.message || 'Error en registro');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error en registro');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Registro</Typography>
          {error && <Typography color="error" align="center">{error}</Typography>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
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
            <Button type="submit" variant="contained" color="primary">Registrar</Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
