import  { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (auth.user) {
    // redirect depending on role
    if (auth.user.role === 'manager') navigate('/dashboard');
    else navigate('/products');
  }

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.login(email, password);
      if (auth.user?.role === 'manager') navigate('/dashboard');
      else navigate('/products');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 480, margin: '24px auto', color:'red' }}>
      <Typography variant="h5" gutterBottom color="red">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={submit} sx={{ mt: 2, display: 'grid', gap: 2 }}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" type="submit" disabled={loading}>Sign in</Button>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>Use <strong>manager@slooze.com</strong> or <strong>keeper@slooze.com</strong> / <strong>123456</strong></Typography>
        </Box>
      </Box>
    </Paper>
  );
}
