import {
  SpeechConfig,
  AudioConfig,
  SpeechSynthesizer,
  ResultReason,
} from 'microsoft-cognitiveservices-speech-sdk';

//CHANGE THESE VALUES
// todo: find a way to securely keep these values
const key = '';
const region = '';

export const synthesizeSpeech = (voice, text) => {
  const audioFile = 'YourAudioFile.wav';
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
    },
    function (err) {
      console.trace('err - ' + err);
      synthesizer.close();
    },
  );

  console.log('Now synthesizing to: ' + audioFile);
};
