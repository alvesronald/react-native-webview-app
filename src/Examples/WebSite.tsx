import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';


export default function WebSite() {
  return (
   <SafeAreaView style={{ flex: 1 }}>
     <WebView
      style={styles.container}
      source={{ uri: 'https://expo.dev' }}
    />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
