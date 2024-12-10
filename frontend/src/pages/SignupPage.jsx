import { motion } from 'framer-motion';
import Input from '../components/Input';
import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthBuilder from '../components/PasswordStrengthBuilder';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = (e) => {
    e.preventDefault();
    // form submission logic here
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='auth-card'
    >
      <div className='p-8'>
        <h2 className='auth-card-header'>
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type='text'
            placeholder='Full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type='email'
            placeholder='Email address'
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
          <PasswordStrengthBuilder password={password}/>
          <motion.button className='auth-card-button' whileHover={{scale: 1.02}} whileTap={{scale: 0.96}} type="submit">Sign up</motion.button>
        </form>
      </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className='text-green-400 hover:underline'>Login</Link>
            </p>
          </div>
    </motion.div>
  );
};

export default SignupPage;
