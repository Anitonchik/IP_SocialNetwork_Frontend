import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthModel from '../../../components/api/modelAuth';

const AuthPage = () => {
  const navigate = useNavigate();
  const authModel = new AuthModel();
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    userAvatarURL: '',
    userDescription: '',
    pageAddress: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();    
    await authModel.login(loginData.userName, loginData.password)
    if (localStorage.getItem("role") === 'USER'){
      setTimeout(() => { navigate("/main"); }, 0);
    }
    else {
      setTimeout(() => { navigate(`/profile/${localStorage.getItem("userId")}`); }, 0);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('Register data:', registerData);
    await authModel.register(registerData);
    setTimeout(() => { navigate("/main"); }, 0);
  };

  return (
    <div className="container-background" style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 className="main-text" style={{fontSize: '40px'}}>{isLogin ? 'Authorization' : 'Registration'}</h2>

      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label className="main-sub-text">Username</label>
            <input
              className="input-login"
              type="text"
              name="userName"
              value={loginData.userName}
              onChange={handleLoginChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label className="main-sub-text">Password</label>
            <input
              className="input-login"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <button  className="adding-post-button btn btn-light" type="submit" style={{ width: '100%', padding: '8px',  border: 'none', borderRadius: '4px' }}>
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <input
              className="input-login"
              placeholder="First Name"
              name="firstName"
              value={registerData.firstName}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="Last Name"
              name="lastName"
              value={registerData.lastName}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="Username (Login)"
              name="userName"
              value={registerData.userName}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="User Avatar URL"
              name="userAvatarURL"
              value={registerData.userAvatarURL}
              onChange={handleRegisterChange}
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <textarea
            className="input-login"
              placeholder="User Description"
              name="userDescription"
              value={registerData.userDescription}
              onChange={handleRegisterChange}
              style={{ width: '100%', padding: '6px', minHeight: '60px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="Phone"
              name="phone"
              type="tel"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="Password"
              name="password"
              type="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
            className="input-login"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
          <button className="adding-post-button" type="submit" style={{ width: '100%', padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            Register
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
            >
              Log in
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthPage;