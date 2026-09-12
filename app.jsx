import { useState } from 'react';
import { TelegramWebApp } from 'telegram-web-app-js';

const tg = new TelegramWebApp();
tg.ready();
tg.expand();

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'game', 'lobby'
  const [gameId, setGameId] = useState(null);

  const handlePlayWithBots = () => {
    // Create a local game with AI bots
    const newGameId = 'local_' + Date.now();
    setGameId(newGameId);
    setView('game');
    // Initialize game with 3 AI bots + User
  };

  const handleChallengeFriend = () => {
    // Generate a unique invite code
    const inviteCode = Math.random().toString(36).substring(7).toUpperCase();
    // Show a modal with the invite code and a "Share to Group" button
    setView('lobby');
  };

  if (view === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-8">🎲 Ludo Master</h1>
        <button 
          className="w-64 py-3 bg-blue-600 rounded-lg mb-4 text-lg" 
          onClick={handlePlayWithBots}
        >
          🎮 Play with Bots
        </button>
        <button 
          className="w-64 py-3 bg-green-600 rounded-lg text-lg" 
          onClick={handleChallengeFriend}
        >
          👥 Challenge a Friend
        </button>
      </div>
    );
  }

  if (view === 'lobby') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h2>Share this code in a group:</h2>
        <div className="bg-gray-800 p-4 rounded-lg my-4 text-2xl font-mono">
          {gameId || 'GENERATING...'}
        </div>
        <button 
          className="w-64 py-3 bg-purple-600 rounded-lg" 
          onClick={() => {
            // Trigger Telegram share sheet
            tg.openTelegramLink(`https://t.me/your_bot_username?start=${gameId}`);
          }}
        >
          📤 Share to Group
        </button>
      </div>
    );
  }

  // If view is 'game', render the LudoBoard component
  return <LudoBoard gameId={gameId} />;
}
