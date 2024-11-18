import WebApp from '@twa-dev/sdk';

function App() {
  WebApp.ready();
  WebApp.expand();

  return (
    <>
      <h1>
        First Project with Telegram Mini App
      </h1>
    </>
  )
}

export default App;
