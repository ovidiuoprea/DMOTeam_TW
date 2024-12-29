import React, { useEffect, useState } from 'react';
import { getCurrentAuthenticatedUser } from '../services/userService';

const WelcomeText = () => {
  const [user, setUser] = useState(getCurrentAuthenticatedUser());

  return (
    <p className="font-bold text-lg text-gray-700">
      {user ? `Welcome, ${user.name}!` : 'You are not logged in.'}
    </p>
  );
};

export default WelcomeText;
