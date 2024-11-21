import React, { useState, useEffect } from 'react';

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
    <div className="w-10 flex justify-center">
      -
    </div>
    <div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

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
    <div 
      className="p-6 max-w-md mx-auto"
      style={{
        backgroundColor: themeInfo?.backgroundColor || 'white',
        color: themeInfo?.textColor || 'black'
      }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
      </div>

      <div className="space-y-4">
        <ProfileItem
          label="Name"
          value={`${userInfo.firstName} ${userInfo.lastName || ''}`}
        />

        <ProfileItem
          label="Language"
          value={userInfo.languageCode}
        />

        <ProfileItem
          label="Username"
          value={userInfo.username || 'Not set'}
        />

        <ProfileItem
          label="Premium"
          value={userInfo.isPremium ? 'Yes' : 'No'}
        />
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        User ID: {userInfo.id}
      </div>
    </div>
  );
};

export default TelegramProfile;