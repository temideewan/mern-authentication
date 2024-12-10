import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    console.log(value);
    const newCode = [...code];
    // handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);
      // focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusedIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusedIndex].focus();
    } else {
      console.log('changed entry');
      newCode[index] = value;
      setCode(newCode);

      // move focus to the next input field if value is entered;
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const isLoading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    // form submission logic here
    const verificationCode = code.join('');
    console.log(`You submitted ${verificationCode}`);
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code]);
  return (
    <div className='auth-card'>
      <motion.div
        className='auth-card bg-gray-800 p-8'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='auth-card-header'>Verify Your Email</h2>
        <p className='text-center text-gray-300 mb-6'>
          Enter the 6-digit code sent to your email address
        </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength='6'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 border-2 border--gray-500 rounded-lg focus:border-green-500 focus:outline-none text-white transition-duration-200'
              />
            ))}
          </div>
          <motion.button
            className='auth-card-button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type='submit'
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
