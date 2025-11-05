import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {useState} from 'react';

const [recording, setRecording] = useState(false);
const [filePath, setFilePath] = useState('');

const audioSet = {
  AudioEncoderAndroid: 'aac', // Audio encoding for Android
  AudioSourceAndroid: 'mic', // Use the microphone
  AVModeIOS: 'measurement', // iOS audio mode
  AVEncoderAudioQualityKeyIOS: 'high', // High quality for iOS
  AVFormatIDKeyIOS: 'aac', // AAC format for iOS
};

export const startRecording = async () => {
  const dirs = RNFS.ExternalDirectoryPath;
  const path = `${dirs}/hello.m4a`;
  const result = await AudioRecorderPlayer.startRecorder(path, audioSet, true);
  setRecording(true);
  setFilePath(result);
  console.log('Recording started at: ', result);
};

export const stopRecording = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  setRecording(false);
  console.log('Recording saved at: ', result);
  // const uploadResult = uploadAudio(filePath); // Upload the saved file
  // return uploadResult;
  playAudioFromFile(filePath);
};

const uploadAudio = async filePath => {
  const file = {
    uri: `file://${filePath}`,
    type: 'audio/aac',
    name: 'audio.aac',
  };
  const formData = new FormData();
  formData.append('audio_file', file);
  formData.append('lang', 'en-US');
  try {
    const response = await axios({
      method: 'post',
      url: 'about:blank',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer YOUR_API_TOKEN`,
      },
      data: formData,
    });
    console.log('Upload success: ', response);
    return response;
  } catch (error) {
    console.error('Upload failed: ', error);
  }
};

const playAudioFromFile = async filePath => {
  try {
    // Add 'file://' prefix for local files, especially on Android
    const formattedPath =
      Platform.OS === 'android' ? `file://${filePath}` : filePath;

    await audioRecorderPlayer.startPlayer(formattedPath);
    await audioRecorderPlayer.setVolume(1.0); // Set desired volume

    // Optional: Add a playback listener to handle events like completion
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        // Handle playback completion (e.g., update UI)
      }
      // Update playback progress if needed
    });
  } catch (err) {
    console.error('Error playing audio:', err);
  }
};
