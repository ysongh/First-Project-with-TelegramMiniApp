import WebApp from '@twa-dev/sdk';

import Counter from './components/Counter';
import TelegramProfile from './components/TelegramProfile';
import TelegramBotMessaging from './components/TelegramBotMessaging';
import CollaborativeTodoList from './components/CollaborativeTodoList';

function App() {
  WebApp.ready();
  WebApp.expand();

  return (
    <>
      {/* <Counter /> */}
      {/* <TelegramBotMessaging /> */}
      <CollaborativeTodoList />
    </>
  )
}

export default App;
