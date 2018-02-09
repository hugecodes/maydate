import React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, View, Text, Vibration } from 'react-native';
import { SecureStore, Accelerometer, Camera, KeepAwake } from 'expo';

const cameraType = Camera.Constants.Type.front;

export default class Home extends React.Component {
  static navigationOptions = {
    header: null, // Hide the nav bar
  };

  static type = Camera.Constants.Type.front

  constructor(props) {
    super(props);
    
    this.state = {
      facesDetected: false
    }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <TouchableWithoutFeedback
        onLongPress={ this.getMeOutOfHere }
        delayLongPress={ 1000 }
      >
        <View style={ styles.container }>
          <StatusBar hidden={ true } />
          <KeepAwake />
          <Camera
            type={cameraType}
            ref={ref => { this.camera = ref; }}
            onFacesDetected={ !this.state.facesDetected ? this.detectAFace : null }
            onFaceDetectionError={ this.onFaceDetectionError }
            faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  detectAFace = ({ faces }) => {
    this.setState({ facesDetected: true });
    this.getMeOutOfHere();
  }

  onFaceDetectionError = () => {
    this.setState({ facesDetected: false });
  }

  // takeAPicture = async () => {
  //   if (this.camera && this.state.facesDetected) {
  //     let photo = await this.camera.takePictureAsync();
  //     this.setState({ facesDetected: false });
  //   } else {
  //     alert('no faces detected');
  //   }
  // }

  getMeOutOfHere = () => {
    SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
      if (!phoneNumber) {
        return;
      }
      Vibration.vibrate(500);
      fetch(`http://52.207.221.31:3000/call?number=${ phoneNumber }`);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
