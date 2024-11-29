import WebApp from '@twa-dev/sdk';

import Counter from './components/Counter';
import TelegramProfile from './components/TelegramProfile';
import TelegramBotMessaging from './components/TelegramBotMessaging';

function App() {
  WebApp.ready();
  WebApp.expand();

  return (
    <>
      {/* <Counter /> */}
      <TelegramBotMessaging />
    </>
  )
}

export default App;
