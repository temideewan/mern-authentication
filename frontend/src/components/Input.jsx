import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Input = ({ icon: Icon, ...props }) => {
  const [type, setType] = useState(props.type);
  const handleTogglePasswordVisibility = () => {
    setType(type === 'password' ? 'text' : 'password');
  };
  return (
    <div className='relative mb-6'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className='size-5 text-green-500' />
      </div>
      <input
        {...props}
        type={type}
        className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition-duration-200'
      />
      {props.type === 'password' && (
        <div
          className='absolute inset-y-0 right-0 flex items-center pr-3'
          onClick={handleTogglePasswordVisibility}
        >
          {type === 'password' ? (
            <EyeClosed className='size-5 text-green-500' />
          ) : (
            <Eye className='size-5 text-green-500' />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
