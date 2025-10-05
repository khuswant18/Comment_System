import React from 'react';
import UserProfile from './UserProfile';
import LoginButton from './LoginButton';

const Header = ({ user, onLogin, onLogout }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">Comment System</h1>
      <div className="flex items-center gap-2">
        {user ? (
          <UserProfile user={user} onLogout={onLogout} />
        ) : (
          <LoginButton onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default Header;