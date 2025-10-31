import React, { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import './Login.css';

function Login({ onLogin }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
      onLogin(currentUser);
    }

    // Listen for login events
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      onLogin(user);
      netlifyIdentity.close();
    });

    // Listen for logout events
    netlifyIdentity.on('logout', () => {
      setUser(null);
      onLogin(null);
    });

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, [onLogin]);

  const handleLogin = () => {
    netlifyIdentity.open('login');
  };

  if (user) {
    return null; // User is logged in, don't show login screen
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">🔒</div>
        <h1>VeganMaps Dashboard</h1>
        <p>Please login to manage featured recipes</p>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
