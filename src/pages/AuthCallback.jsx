import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../components/UIFeedback/Toast';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [status, setStatus] = useState('Autenticando...');

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    
    const code = searchParams.get('code');
    
    if (!code) {
      setStatus('No se encontró el código de autorización.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    hasFetched.current = true; // Setup before async call

    const authenticate = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${API_URL}/api/auth/discord`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (response.ok) {
          login(data.token, data.user);
          showToast(`¡Bienvenido de vuelta, ${data.user.username}!`, 'success');
          navigate('/');
        } else {
          setStatus(`Error: ${data.error || 'Autenticación fallida'}`);
          showToast(`Error: ${data.error}`, 'error');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        setStatus('Error de conexión con el servidor.');
        showToast('Error de red durante la autenticación', 'error');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    authenticate();
  }, [searchParams, navigate, login]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'white' }}>
      <h2>{status}</h2>
    </div>
  );
};

export default AuthCallback;
