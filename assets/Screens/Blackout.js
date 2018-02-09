import React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, View, Text, Vibration } from 'react-native';
import { SecureStore, Accelerometer, Camera, KeepAwake, Audio } from 'expo';
import { RNS3 } from 'react-native-aws3';

const cameraType = Camera.Constants.Type.front;
const detectionMode = Camera.Constants.FaceDetection.Mode.accurate;
const detectionLandmarks= Camera.Constants.FaceDetection.Landmarks.all;
const faceDetectionClassifications = Camera.Constants.FaceDetection.Classifications.all;

const recordingOptions = {
  android: {
    extension: '.wav',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}

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
    // if (this.props.navigation.state.params.haveAudioPermissions) {
    //   this.recordAudio();
    // }
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

  // recordAudio = async () => {
  //   console.log('recording');
  //   const recording = new Expo.Audio.Recording();
  //   try {
  //     await recording.prepareToRecordAsync(recordingOptions);
  //     await recording.startAsync();
  //     // You are now recording!
  //   } catch (error) {
  //     // An error occurred!
  //   }

  //   setTimeout(() => {
  //     recording.stopAndUnloadAsync();
  //     const record = recording.getURI();
  //     const file = {
  //       url: record,
  //       name: `${Math.floor(Math.random() * Math.floor(9999999))}.wav`,
  //       type: 'audio/wav'
  //     };

  //     RNS3.put(file, options).then((res) => {
  //       console.log(res)
  //       if (res.status !== 201) {
  //         throw new Error('fuckkkkk');
  //       }
  //       alert('sent');
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }, 3000);
  // }

  detectAFace = ({ faces }) => {
    if (!faces.length) return;
    const face = faces[0];
    const isSmiling = face.smilingProbability;
    const isWinking = face.rightEyeOpenProbability < 0.08 && face.leftEyeOpenProbability > 0.4;
    
    if (isSmiling <= 0.006 && isWinking) {
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
