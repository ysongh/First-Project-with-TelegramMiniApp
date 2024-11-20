import WebApp from '@twa-dev/sdk';

import Counter from './components/Counter';
import TelegramProfile from './components/TelegramProfile';

function App() {
  WebApp.ready();
  WebApp.expand();

  return (
    <>
      <h1 className='text-center text-2xl'>
        First Project with Telegram Mini App
      </h1>
      {/* <Counter /> */}
      <TelegramProfile />
    </>
  )
}

export default App;
