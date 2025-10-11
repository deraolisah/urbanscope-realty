import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-xl mx-auto mt-12 p-6 relative text-center overflow-hidden">
      {/* Toggle Buttons */}
      <div className="flex justify-evenly border-b border-gray-300 font-light relative">
        <button onClick={() => setIsLogin(true)} className="w-full py-3 cursor-pointer" title='Login'>
          Log In
        </button>
        <button onClick={() => setIsLogin(false)} className="w-full py-3 cursor-pointer" title='Register'>
          Register
        </button>
        <div className={`absolute bottom-0 h-0.5 w-1/2 left-0 bg-dark transition-transform duration-800 ${
            isLogin ? 'translate-x-0' : 'translate-x-full'
          }`}
        />
      </div>

      {/* Forms */}
      <div className="relative h-[320px] mt-8">
        {/* Login Form */}
        <form
          className={`absolute top-0 left-0 w-full flex flex-col gap-4 transition-all duration-600 ${
            isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 px-4 py-2 w-full input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 w-full input-field"
          />
          <small className="text-left w-full">
            <a href="#" className="text-dark/80 underline">
              forgot your password?
            </a>
          </small>
          <button type="submit" className="btn mt-2">
            Login
          </button>
        </form>

        {/* Register Form */}
        <form
          className={`absolute top-0 left-0 w-full flex flex-col gap-4 transition-all duration-500 ${
            isLogin ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 px-4 py-2 w-full input-field"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-4 py-2 w-full input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 w-full input-field"
          />
          <small className="text-left text-dark/80 w-full">
            Already have an account?{' '}
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </small>
          <button type="submit" className="btn mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;