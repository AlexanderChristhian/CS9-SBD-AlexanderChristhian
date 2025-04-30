import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Fix the URL to avoid double slashes
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const registerUrl = baseUrl.endsWith('/') 
        ? `${baseUrl}user/register` 
        : `${baseUrl}/user/register`;
        
      console.log("Registration URL:", registerUrl);
      
      // Using POST with query parameters
      const response = await axios.post(
        registerUrl,
        null,
        {
          params: {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            balance: 0
          }
        }
      );
      
      console.log("Registration response:", response.data);
      
      // Check if registration was successful
      if (response.data.success) {
        // Show success message and redirect to login page
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = '/login';
      } else {
        // If response has success: false, show the error message
        setError(response.data.message || 'Registrasi gagal. Silakan coba lagi.');
      }
    } catch (error) {
      // Enhanced error logging
      console.error('Registration error:', error);
      console.log('Error details:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response',
        request: error.request ? 'Request made but no response received' : 'No request made'
      });
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Registrasi gagal. Coba dengan email lain.');
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
            <h2 className="text-2xl font-bold text-white text-center">Daftar Akun Baru</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="py-6 px-8">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nama lengkap Anda"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
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
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Buat password Anda"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Konfirmasi password Anda"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
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
                ) : 'Daftar'}
              </button>
              
              <div className="text-center">
                <span className="text-gray-600">Sudah punya akun? </span>
                <a href="/login" className="text-red-800 hover:text-red-700 font-medium">
                  Login di sini
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
