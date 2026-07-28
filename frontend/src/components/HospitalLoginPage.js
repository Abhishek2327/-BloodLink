import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

import loginIllustration from 'url:../assets/login-illustration.svg'; 

function HospitalLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/hospitals/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password.');
      }

      const hospitalData = await response.json();
      
      // Login with hospital data
      login(hospitalData);
      navigate('/hospital-dashboard');

    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, type) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    const message = type === 'email' ? 'Email copied!' : 'Password copied!';
    setToast(message);
    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl space-y-6">
        {/* Main Hospital Login Card */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-x-12 gap-y-8 items-center card-modern p-6 sm:p-8 md:p-12 max-w-5xl mx-auto animate-fade-in-up">
          
          <div className="w-full md:order-1">
            <div className="text-center md:text-left mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-heading text-gray-900 mb-2">Hospital Login</h2>
              <p className="text-body text-gray-600">Access the dashboard to manage blood requests and connect with donors.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bloodlink.iiitu@gmail.com" 
                  required 
                  className="input-modern"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  className="input-modern"
                />
              </div>

              {error && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-fade-in-up">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold">{error}</p>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex flex-col items-center text-center md:order-2">
            <div className="relative mb-8">
              <img src={loginIllustration} alt="Secure Login Illustration" className="w-full max-w-xs sm:max-w-sm animate-float" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-subheading text-gray-900">Secure & Simple</h3>
              <p className="text-body text-gray-600 max-w-sm">
                Manage your blood donation requests through our secure portal. Connect with donors and save lives efficiently.
              </p>
              
              {/* Features */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Real-time donor notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Track request status</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Manage donor database</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Hospital Credentials Card */}
        <div className="card-modern p-6 sm:p-8 max-w-5xl mx-auto relative animate-fade-in-up">
          {/* Top-Right Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
            <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full border border-red-200 inline-flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Demo Account
            </span>
          </div>

          <div className="mb-6 pr-28 sm:pr-36">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>🏥</span> Demo Hospital Credentials
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Use these demo credentials to explore the Hospital Dashboard and Blood Request Management features.
            </p>
          </div>

          {/* Toast Notification */}
          {toast && (
            <div className="mb-4 bg-gray-900 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 animate-fade-in-up w-fit">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{toast}</span>
            </div>
          )}

          {/* Credentials Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  readOnly 
                  value="stjude.hospital@bloodlink.com"
                  className="input-modern pr-12 bg-gray-50 text-gray-800 font-medium cursor-pointer"
                  onClick={() => handleCopy('stjude.hospital@bloodlink.com', 'email')}
                />
                <button 
                  type="button"
                  onClick={() => handleCopy('stjude.hospital@bloodlink.com', 'email')}
                  className="absolute right-2 p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  title="Copy Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  readOnly 
                  value="StJude#2026"
                  className="input-modern pr-12 bg-gray-50 text-gray-800 font-medium cursor-pointer"
                  onClick={() => handleCopy('StJude#2026', 'password')}
                />
                <button 
                  type="button"
                  onClick={() => handleCopy('StJude#2026', 'password')}
                  className="absolute right-2 p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  title="Copy Password"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HospitalLoginPage;


