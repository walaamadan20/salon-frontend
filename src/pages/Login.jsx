import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { login } from '../service/authService';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { validateToken } = useContext(authContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.token);
      validateToken();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input name="username" value={formData.username} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <button type="submit">Login</button>
      </form>

      {/* ✅ Signup link below login form */}
      <p style={{ marginTop: '1rem' }}>
        Don’t have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;
