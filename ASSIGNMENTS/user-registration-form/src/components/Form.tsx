import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    let isValid = true;
    let tempErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (formData.username.length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!formData.email.includes('@')) {
      tempErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (validate()) {
      console.log({ formData });
    } else {
      console.error('Error validating form');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className='mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500' />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className='mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500' />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
          <div className="relative">
            <label className='block text-sm font-medium text-gray-700'>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className='mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 pr-12' />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            <span className="absolute inset-y-0 right-0 flex items-center justify-center h-full pr-3">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 focus:outline-none">
                {showPassword ? 
                  (<FaRegEye className="h-5 w-5" aria-hidden="true" />) : 
                  (<FaRegEyeSlash className="h-5 w-5" aria-hidden="true" />)}
              </button>
            </span>
          </div>
          <div className="relative">
            <label className='block text-sm font-medium text-gray-700'>Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className='mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 pr-12' />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            <span className="absolute inset-y-0 right-0 flex items-center justify-center h-full pr-3">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 focus:outline-none">
                {showPassword ? 
                  (<FaRegEye className="h-5 w-5" aria-hidden="true" />) : 
                  (<FaRegEyeSlash className="h-5 w-5" aria-hidden="true" />)}
              </button>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className='w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Form;
