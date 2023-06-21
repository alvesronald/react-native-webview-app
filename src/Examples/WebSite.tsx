import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

const runBeforeFirst = `
window.onerror = function(message, sourcefile, lineno, colno, error) {
  if (error) {
    window.ReactNativeWebView.postMessage("ERROR");
  }
  return true;
};
true;
`;


const MESSAGE_LOADING_LOGIN = 'LOADING_LOGIN';
const MESSAGE_LOGGED = 'LOGGED';
const ERROR = 'ERROR';

const WebSite = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    if (isLoadingLogin && !isLogged) {
      const timeoutId = setTimeout(() => {
        handleError()
        console.log('CLOSE_MODAL');
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoadingLogin, isLogged]);

  const handleLoadingLogin = useCallback(() => {
    setIsLoadingLogin(true);
    console.log('LOADING_LOGIN');
  }, []);

  const handleLogged = useCallback(() => {
    console.log('LOGGED');
    setIsLoadingLogin(false);
    setIsLogged(true);
    closeModal()    
  }, []);

  const handleError = useCallback(() => {
    alert('Ocorreu um erro inesperado!')
    closeModal()
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(visible => !visible);
  },[])

  const onMessage = useCallback(({ nativeEvent: { data } }) => {
    console.log({ data });

    switch (data) {
      case MESSAGE_LOADING_LOGIN:
        handleLoadingLogin();
        break;
      case MESSAGE_LOGGED:
        handleLogged();
        break;
      case ERROR:
        handleError();
        break;
      default:
        break;
    }
  }, [handleLoadingLogin, handleLogged, handleError]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(visible => !visible)}
      >
        <SafeAreaView style={styles.container}>
          <WebView
            style={styles.webview}
            source={{ uri: 'http://localhost:3000/' }}
            injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
            onMessage={onMessage}
          />
        </SafeAreaView>
      </Modal>

      <Text style={styles.info}>{isLogged ? 'LOGGED' : 'NO LOGGED'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  info: {
    fontSize: 20,
  },
});

export default WebSite;



{/* <WebView
ref={webViewRef}
style={styles.container}
source={{ uri: 'http://localhost:3000/' }}
injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
onMessage={onMessage}
// onError={(syntheticEvent) => {
//   console.error('WebView error: ', syntheticEvent);
// }}
// renderError={() => <Text>ERROR</Text>}
// onShouldStartLoadWithRequest={() => true}
// onLoadEnd={() => console.log('onLoadEnd')}
/> */}