
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setMessage('Sign up successful! Welcome, ' + formData.username);
    
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('public/safety/background.jpg')" }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-20 p-6 rounded shadow-md w-1/3"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Sign Up</h2>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 rounded w-full hover:bg-pink-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
