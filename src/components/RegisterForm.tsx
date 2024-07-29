import React, { useState } from 'react';

interface RegisterFormProps {
    onRegisterSuccess: () => void;
  }
  
  const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://us-central1-ardent-gate-430705-p3.cloudfunctions.net/login-promociones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const result = await response.json();
        if (result.success) {
          onRegisterSuccess();
        } else {
          alert('Registration failed: ' + result.message);
        }
      } catch (error: unknown) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
          alert('Registration error: ' + error.message);
        } else {
          alert('An unknown error occurred.');
        }
      }
    };
  
    return (
      <form onSubmit={handleRegister}>
        <h1>Formulario de Registro</h1>
        <label>
          Correo:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Registrar</button>
      </form>
    );
  };
  
  export default RegisterForm;
export {}; 