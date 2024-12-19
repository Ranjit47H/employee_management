import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate();
  
  const handleLogin = async (formData) => {
    const { email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Login successful');
        setError('');
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); 
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-green-400 to-teal-600 p-8 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl font-bold mb-4">New Here?</h2>
          <p className="text-center mb-6">
            Sign up and discover great opportunities.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="py-2 px-6 border border-white rounded-full hover:bg-white hover:text-teal-600 transition duration-300"
          >
            SIGN UP
          </button>
        </div>
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
            Login
          </h2>
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            error={error}
            success={success}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;