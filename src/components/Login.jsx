import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUsername = import.meta.env.VITE_REACT_APP_USERNAME;
    const storedPassword = import.meta.env.VITE_REACT_APP_PASSWORD;

    if (username === storedUsername && password === storedPassword) {
      navigate('/locks');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <Header />
      <div className="login">
        <h2 className="login__title">Iniciar sesión</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-group">
            <label htmlFor="username" className="login__label">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="login__input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="login__input-group">
            <label htmlFor="password" className="login__label">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="login__input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="login__button">
            Iniciar sesión
          </button>
          {error && <p className="login__error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
