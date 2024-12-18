import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, isLoading, error} = useAuthStore();
  const handleLogin = async(e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='auth-card'
    >
      <div className='p-8'>
        <h2 className='auth-card-header'>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex items-center mb-6'>
            <Link
              to='/forgot-password'
              className='text-sm text-green-400 hover:underline'
            >
              Forgot password?
            </Link>
          </div>
          {error && <p className='font-semibold text-red-500 mb-2'>{error}</p>}
          <motion.button
            className='auth-card-button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type='submit'
          >
            {isLoading ? (
              <Loader className='size-6 animate-spin mx-auto' />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-green-400 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
