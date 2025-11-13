import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import {
  SpeechConfig,
  AudioConfig,
  SpeechSynthesizer,
  ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

//CHANGE THESE VALUES
// todo: find a way to securely keep these values
const key = '';
const region = '';

export const synthesizeSpeech = (voice, text) => {
  const dirs = RNFS.ExternalDirectoryPath;
  const audioFile = `${dirs}/speech.wav`;
  const speechConfig = SpeechConfig.fromSubscription(key, region);
  const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);
  // The language of the voice that speaks.
  speechConfig.speechSynthesisVoiceName = voice;
  // Create the speech synthesizer.
  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  // Start the synthesizer and wait for a result.
  synthesizer.speakTextAsync(
    text,
    function (result) {
      if (result.reason === ResultReason.SynthesizingAudioCompleted) {
        console.log('synthesis finished.');
      } else {
        console.error(
          'Speech synthesis canceled, ' +
            result.errorDetails +
            '\nDid you set the speech resource key and region values?',
        );
      }
      synthesizer.close();
      playAudioFromFile(audioFile);
    },
    function (err) {
      console.trace('err - ' + err);
      synthesizer.close();
    },
  );

  console.log('Now synthesizing');
};

const playAudioFromFile = async filePath => {
  try {
    // Add 'file://' prefix for local files, especially on Android
    const formattedPath =
      Platform.OS === 'android' ? `file://${filePath}` : filePath;

    await AudioRecorderPlayer.startPlayer(formattedPath);
    await AudioRecorderPlayer.setVolume(1.0); // Set desired volume

    // Optional: Add a playback listener to handle events like completion
    AudioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        AudioRecorderPlayer.stopPlayer();
        AudioRecorderPlayer.removePlayBackListener();
        // Handle playback completion (e.g., update UI)
      }
      // Update playback progress if needed
    });
  } catch (err) {
    console.error('Error playing audio:', err);
  }
};
