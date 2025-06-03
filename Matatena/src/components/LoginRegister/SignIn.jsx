import React, { useState } from 'react';

const inputStyle = "w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400";
const buttonStyle = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition";
const errorStyle = "text-red-500 text-sm mb-2 text-center";
/**
 * Expresión regular para que la contraseña sea válida:
 * - Al menos 8 caracteres
 * - Al menos una letra minúscula
 * - Al menos una letra mayúscula
 * - Al menos un número
 * - Al menos un carácter especial (como !@#$%^&*...)
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        setSuccess('Registro exitoso.');
        setUsername('');
        setPassword('');
        setRepeatPassword('');
      } else {
        setError('Error en el registro.');
        console.error('Error en el registro:', response.statusText);
      }
    } catch {
      setError('Error en el registro.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
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
      <input
        className={inputStyle}
        type="password"
        placeholder="Repite la contraseña"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        required
      />
      <button className={buttonStyle} type="submit">
        Registrarse
      </button>
    </form>
  );
};

export default SignUp;