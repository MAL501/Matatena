import React, { useState } from 'react';

const inputStyle = "w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400";
const buttonStyle = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const errorStyle = "text-red-500 text-sm mb-2 text-center";

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Estructura actualizada para nuestro backend
      if (data.status === 'success' && data.data && data.data.tokens) {
        // Almacena el JWT en localStorage
        localStorage.setItem('token', data.data.tokens.accessToken);
        
        localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
        
        if (data.data.user) {
          localStorage.setItem('username', data.data.user.username);
        }
        
        setSuccess('Login exitoso.');
        setUsername('');
        setPassword('');
      } else {
        setError('Formato de respuesta inesperado.');
        console.error('Formato de respuesta inesperado:', data);
      }
    } else {
      // Mostrar mensaje de error específico si está disponible
      const errorMessage = data.message || 'Usuario o contraseña incorrectos.';
      setError(errorMessage);
      console.error('Error en el login:', data);
    }
  } catch (error) {
    setError('Error en el login. Comprueba la conexión al servidor.');
    console.error('Error en la petición:', error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      {error && <div className={errorStyle}>{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2 text-center">{success}</div>}
      <input
        className={inputStyle}
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className={inputStyle}
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className={buttonStyle} type="submit">
        Iniciar sesión
      </button>
    </form>
  );
};

export default LogIn;