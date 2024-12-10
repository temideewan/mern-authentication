import { Check, X } from 'lucide-react';

const PasswordCriteria = ({ password }) => {
  console.log(password);
  console.log(/A-Z/.test(password));
  const criteria = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
  ];
  return (
    <div className='mt-2 space-y-1'>
      {criteria.map((item) => {
        return (
          <div className='flex items-center text-xs' key={item.label}>
            {item.met ? (
              <Check className='size-4 text-green-500 mr-2' />
            ) : (
              <X className='size-4 text-gray-500 mr-2' />
            )}
            <span className={item.met ? 'text-green-500' : 'text-gray-500'}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
const PasswordStrengthBuilder = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 12) strength++;
    if (password.match(/[A-Z]/) && password.match(/[a-z]/)) strength += 2;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);
  const strengthObj = getStrengthObject(strength);
  return (
    <div className='mt-2'>
      <div className='flex justify-between mb-1 items-center'>
        <span className='text-xs text-gray-400'>Password strength</span>{' '}
        <span className='text-xs text-gray-400'>
          {strengthObj.text}
        </span>
      </div>
      <div className='flex space-x-1'>
        {[...Array(4)].map((_, index) => {
          return (
            <div
              className={`h-1 w-1/4 transition-colors duration-300 ${
                index < strength ? strengthObj.color : 'bg-gray-600'
              }`}
              key={index}
            ></div>
          );
        })}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );

  function getStrengthObject(passwordStrength) {
    if (passwordStrength == 0)
      return { text: 'Very weak', color: 'bg-red-500' };
    if (passwordStrength == 1) return { text: 'Weak', color: 'bg-red-400' };
    if (passwordStrength == 2) return { text: 'fair', color: 'bg-yellow-500' };
    if (passwordStrength == 3) return { text: 'Good', color: 'bg-yellow-400' };
    return { text: 'Strong', color: 'bg-green-500' };
  }
};

export default PasswordStrengthBuilder;
