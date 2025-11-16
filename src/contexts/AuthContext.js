import  { createContext, useContext, useEffect, useState } from 'react';
import { loginUser } from '../utils/mockApi';

const AuthContext = createContext(null);
const AUTH_KEY = 'slooze_auth_v1';

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, token: null });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    const newState = { user: res.user, token: res.token };
    setState(newState);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newState));
  };

  const logout = () => {
    setState({ user: null, token: null });
    localStorage.removeItem(AUTH_KEY);
  };

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
