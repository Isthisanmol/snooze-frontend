import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuth } from '../contexts/AuthContext';
import { useThemeCustom } from '../contexts/ThemeContext';

export default function Navbar() {
  const auth = useAuth();
  const theme = useThemeCustom();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none', mr: 2 }}>
          Slooze Commodities
        </Typography>

        <Button component={RouterLink} to="/products" color="inherit">Products</Button>

        {auth.user?.role === 'manager' && (
          <Button component={RouterLink} to="/dashboard" color="inherit">Dashboard</Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={theme.toggle}>
          {theme.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {!auth.user ? (
          <Button component={RouterLink} to="/login" color="inherit">Login</Button>
        ) : (
          <>
            <Typography variant="body2" sx={{ mx: 2 }}>{auth.user.email} • {auth.user.role}</Typography>
            <Button onClick={handleLogout} color="inherit">Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
