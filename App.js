import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
class App extends Component {
  webref = null;
  render() {
    return (
      <WebView
        ref={r => (this.webref = r)}
        originWhitelist={['*']}
        source={{
          uri: 'https://ellorem.xyz/welcome',
        }}
        javaScriptEnabled
        onMessage={event => {
          const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          if (event.nativeEvent.data === 'file_upload') {
            ImagePicker.showImagePicker(options, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log(
                  'User tapped custom button: ',
                  response.customButton,
                );
              } else {
                this.webref.postMessage(JSON.stringify(response));
              }
            });
          } else {
            console.log(event.nativeEvent.data);
          }
        }}
      />
    );
  }
}

export default App;
