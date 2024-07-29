import React, { useState } from 'react';

interface LoginFormProps {
    onLoginSuccess: () => void;
  }
  
  const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://us-central1-ardent-gate-430705-p3.cloudfunctions.net/login-real', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const result = await response.json();
        if (result.success) {
          onLoginSuccess();
        } else {
          alert('Login failed: ' + result.message);
        }
      } catch (error: unknown) {
        console.error('Login error:', error);
        if (error instanceof Error) {
          alert('Login error: ' + error.message);
        } else {
          alert('An unknown error occurred.');
        }
      }
    };
  
    return (
      <form onSubmit={handleLogin}>
        <h1>Inicio de Sesión</h1>
        <label>
          Correo:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    );
  };
  
  export default LoginForm;
  
export {}; 