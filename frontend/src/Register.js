import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const redirection = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Please enter two same passwords.');
      return;
    }

    console.log('Sending register:', { username, email, password });

    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok) {
        alert('Uspešna registracija!');
        redirection('/');
      } else {
        alert('Greška: ' + data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Došlo je do greške.');
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-card">
        <div className="reg-card__content">
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px', fontWeight: '700' }}>
            Create Your Account
          </h2>
          <form className="reg-form" onSubmit={handleRegister}>
            <div className="reg-form__field">
              <i className="reg-form__icon fas fa-user"></i>
              <input
                type="text"
                className="reg-form__input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="reg-form__field">
              <i className="reg-form__icon fas fa-envelope"></i>
              <input
                type="email"
                className="reg-form__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="reg-form__field">
              <i className="reg-form__icon fas fa-lock"></i>
              <input
                type="password"
                className="reg-form__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="reg-form__field">
              <i className="reg-form__icon fas fa-lock"></i>
              <input
                type="password"
                className="reg-form__input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="reg-form__submit" type="submit">
              <span>Register</span>
              <i className="reg-btn__icon fas fa-chevron-right"></i>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ color: '#D1D1D4', fontSize: '12px', marginLeft: '35px' }}>
                Already have an account?{' '}
                <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>
                  Log In
                </a>
              </span>
            </div>
          </form>
        </div>
        <div className="reg-card__background">
          <span className="reg-shape reg-shape4"></span>
          <span className="reg-shape reg-shape3"></span>
          <span className="reg-shape reg-shape2"></span>
          <span className="reg-shape reg-shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
