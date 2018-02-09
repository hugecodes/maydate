import React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, View, Text, Vibration } from 'react-native';
import { SecureStore, Accelerometer, Camera, KeepAwake } from 'expo';

const cameraType = Camera.Constants.Type.front;
const detectionMode = Camera.Constants.FaceDetection.Mode.accurate;
const detectionLandmarks= Camera.Constants.FaceDetection.Landmarks.all;
const faceDetectionClassifications = Camera.Constants.FaceDetection.Classifications.all;

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

  render() {
    return (
      <TouchableWithoutFeedback
        onLongPress={ this.getMeOutOfHere }
        delayLongPress={ 1000 }
      >
        <View style={ styles.container }>
          <StatusBar hidden={ true } />
          <Camera 
            type={cameraType} 
            faceDetectionMode={ detectionMode }
            faceDetectionLandmarks={ detectionLandmarks }
            faceDetectionClassifications={ faceDetectionClassifications }
            ref={ref => { this.camera = ref; }} 
            onFacesDetected={ !this.state.facesDetected ? this.detectAFace : null }
            onFaceDetectionError={ this.onFaceDetectionError }
          />
          <KeepAwake />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  detectAFace = ({ faces }) => {
    if (!faces.length) return;
    const face = faces[0];
    const isSmiling = face.smilingProbability;
    const isWinking = face.rightEyeOpenProbability < 0.08 && face.leftEyeOpenProbability > 0.4;
    
    if (isSmiling <= 0.009 && isWinking) {
      this.setState({ facesDetected: true });
      this.getMeOutOfHere();
    }
  }

  onFaceDetectionError = () => {
    this.setState({ facesDetected: false });
  }

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
