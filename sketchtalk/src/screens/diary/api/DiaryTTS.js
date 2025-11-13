import {NativeModules} from 'react-native';

const {TTSModule} = NativeModules;
const key = '';
const region = '';

export const synthesizeSpeech = async (text, voice) => {
  await TTSModule.textToSpeech(text, voice, key, region);
};
