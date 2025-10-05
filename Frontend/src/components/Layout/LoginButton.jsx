import React from 'react';

const LoginButton = ({ onLogin }) => {
  return (
    <button
      onClick={onLogin}
      className="cursor-pointer bg-black rounded-md text-white px-2 sm:px-3 py-1 text-xs sm:text-sm"
    >
      <span className="hidden sm:inline">Login with Google</span>
      <span className="sm:hidden">Login</span>
    </button>
  );
};

export default LoginButton;