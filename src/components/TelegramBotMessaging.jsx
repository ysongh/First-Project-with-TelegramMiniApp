import React, { useState, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';

import { BOT_TOKEN } from '../keys';

const TelegramBotMessaging = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [sending, setSending] = useState(false);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.ready();
      setUserInfo(webapp.initDataUnsafe.user);
    }
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      setStatus('Please enter a message');
      return;
    }

    setSending(true);
    setStatus('');

    try {
      const CHAT_ID = userInfo.id; // User's Telegram ID

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML', // Supports HTML formatting
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus('Message sent successfully!');
        setMessage('');
      } else {
        setStatus('Failed to send message: ' + data.description);
      }
    } catch (error) {
      setStatus('Error sending message: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center p-4 bg-yellow-50 text-yellow-700 rounded">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>Unable to access user information</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
      />

      <button
        onClick={sendMessage}
        disabled={sending || !message.trim()}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg ${
          sending || !message.trim()
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-medium transition-colors`}
      >
        {sending ? (
          <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </button>
    </div>
  );
};

export default TelegramBotMessaging;