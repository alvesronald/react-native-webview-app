import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const customHTML = `
    <body style="display:flex; flex-direction: column;justify-content: center; 
        align-items:center; background-color: black; color:white; height: 100%;">
        <h1 style="font-size:100px; padding: 50px; text-align: center;" 
        id="h1_element">
           Rendered WebView
        </h1>
        <h2 style="display: block; font-size:80px; padding: 50px; 
        text-align: center;" id="h2_element">
        This text will be changed later!
        </h2>
    </body>
`;


export default function Html() {
  return (
   <SafeAreaView style={{ flex: 1 }}>
     <WebView
      style={styles.container}
      source={{ html: customHTML }} 
    />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
