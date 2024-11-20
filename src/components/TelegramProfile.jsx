import React, { useState, useEffect } from 'react';

const TelegramProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [themeInfo, setThemeInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (!window.Telegram?.WebApp) {
      setError('Telegram WebApp is not properly initialized');
      return;
    }

    const webapp = window.Telegram.WebApp;

    // Initialize the app
    try {
      webapp.ready();
      webapp.expand();

      // Get user data
      const initData = webapp.initDataUnsafe;
      if (initData.user) {
        setUserInfo({
          id: initData.user.id,
          firstName: initData.user.first_name,
          lastName: initData.user.last_name,
          username: initData.user.username,
          languageCode: initData.user.language_code,
          isPremium: initData.user.is_premium,
        });
      }

      // Get theme data
      setThemeInfo({
        colorScheme: webapp.colorScheme,
        themeParams: webapp.themeParams,
      });

      // Listen for theme changes
      webapp.onEvent('themeChanged', () => {
        setThemeInfo({
          colorScheme: webapp.colorScheme,
          themeParams: webapp.themeParams,
        });
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-red-500">Error</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <p>{userInfo.firstName} {userInfo.lastName}</p>
      <p>@{userInfo.username || 'No username set'}</p>
      <p>{userInfo.isPremium ? 'Premium User' : 'Standard User'}</p>
      <p>Language: {userInfo.languageCode?.toUpperCase()}</p>
      <p>Theme: {themeInfo.colorScheme}</p>
      <p>ID: {userInfo.id}</p>
    </div>
  );
};

export default TelegramProfile;