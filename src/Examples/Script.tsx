import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';


// Irá ser executado apenas umas vez ao renderizar a webview
const runJavaScript = `
    const runAlert = () =>  {
        alert('This JS alert');
        window.ReactNativeWebView.postMessage('Data to JS');
    };
    
    runAlert();
`;

const runBeforeFirst = `
    window.isNativeApp = true;
    true; // isso é necessário ou, às vezes, você obterá falhas silenciosas
`;

const onMessage = (event) => {
    console.log(event.nativeEvent.data)

}


export default function Script() {
  return (
   <SafeAreaView style={{ flex: 1 }}>
     <WebView
      style={styles.container}
      onMessage={onMessage}   
      injectedJavaScript={runJavaScript}  
      injectedJavaScriptBeforeContentLoaded={runBeforeFirst} 
    />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
