import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Debug the credential values
      console.log("Attempting login with:", {
        email: formData.email,
        password: formData.password
      });
      
      // Fix the URL and ensure we're using the correct HTTP method
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const loginUrl = baseUrl.endsWith('/') 
        ? `${baseUrl}user/login` 
        : `${baseUrl}/user/login`;
      
      console.log("Login request URL:", loginUrl);
      
      // Try POST since backend routes typically define login as POST
      const response = await axios.post(loginUrl, null, {
        params: {
          email: formData.email,
          password: formData.password
        }
      });
      
      console.log("Login response:", response.data);
      
      // Check if login was successful
      if (response.data.success) {
        // Get the user data from the response
        const userData = response.data.payload;
        
        // Debug the returned user
        console.log("Login successful, user data:", userData);
        
        // Store user data in auth context
        login(userData);
        
        // Redirect to home page
        window.location.href = '/';
      } else {
        // If response has success: false, show the error message
        setError(response.data.message || 'Login gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Enhanced error logging for debugging
      if (error.response) {
        console.log('Error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Email atau password salah.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-16 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-red-800 py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center">Login Pelanggan</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="py-6 px-8">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email Anda"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password Anda"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-red-800 hover:text-red-700">
                  Lupa password?
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className={`bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Proses...
                  </span>
                ) : 'Masuk'}
              </button>
              
              <div className="text-center">
                <span className="text-gray-600">Belum punya akun? </span>
                <a href="/register" className="text-red-800 hover:text-red-700 font-medium">
                  Daftar sekarang
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
