import './App.css';
import { useState } from 'react';

const MESSAGE_LOADING_LOGIN = 'LOADING_LOGIN';
const MESSAGE_LOGGED = 'LOGGED';

function App() {

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
 


  const handleLogin = () => {

    setIsLoadingLogin(true)
    if (!!window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(MESSAGE_LOADING_LOGIN);
      console.log('HAS ReactNativeWebView');

      // setTimeout(() => {
      //   window.ReactNativeWebView.postMessage(MESSAGE_LOGGED);
      //   setIsLoadingLogin(false)

      // }, 5000);
    } else {
     setTimeout(() => {
      setIsLoadingLogin(false)
     }, 11000)
     
    }
    // setTimeout(() => {
    //   throw new Error('We crashed!!!!!');
    // }, 20000);
  };

  return (
    <div style={{ height: '100vh', backgroundColor: 'tomato' }}>
      <button onClick={handleLogin}>LOGIN</button>
      {isLoadingLogin && <h1>LOADING....</h1>}
    </div>
  );
}

export default App;
