import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const AuthForm = ({ type, onSubmit, error, success }) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    if (result.success) {
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    }
  };

  return (

  <div>
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'register' && (
        <div>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData?.name || ''}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
      )}
      <div>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData?.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={formData?.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 text-sm bg-green-100 p-3 rounded-md">
          {success}
        </div>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
      >
        {type === 'register' ? 'SIGN UP' : 'SIGN IN'}
      </button>
    </form>
  </div>
  );
};

export default AuthForm;
