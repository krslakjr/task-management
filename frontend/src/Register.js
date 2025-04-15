import React, { useState } from 'react';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert('Uspešna prijava!');
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Došlo je do greške.');
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
                <a href="#" style={{ fontSize: '12px', color: 'black', textDecoration: 'underline' }}>
                  Forgot password?
                </a>
              </div>
            </div>

            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ color: '#D1D1D4', fontSize: '12px' }}>
                Don't have an account?{' '}
                <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>
                  Create one
                </a>
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

export default Register;
