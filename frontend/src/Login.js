import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Ovdje jednostavno možemo dodati uslov da proverimo da li su uneseni podaci
    if (username === 'admin' && password === 'password') {
      alert('Uspešna prijava!');
      setUsername('');
      setPassword('');
      // Ovde možeš da usmeriš korisnika na dashboard, ili neki drugi deo aplikacije
      // npr. navigate('/dashboard'); (ako koristiš React Router)
    } else {
      alert('Pogrešno korisničko ime ili lozinka');
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px', fontWeight: '700' }}>
            Welcome to TaskFlow
          </h2>
          <form className="login" onSubmit={handleLogin}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ textAlign: 'left', marginTop: '8px' }}>
                <button
                  type="button"
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ color: '#D1D1D4', fontSize: '12px' }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  style={{
                    color: '#fff',
                    background: 'none',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Create one
                </button>
              </span>
            </div>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
