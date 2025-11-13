package com.sketchtalk;

import android.media.MediaPlayer;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.microsoft.cognitiveservices.speech.AudioDataStream;
import com.microsoft.cognitiveservices.speech.SpeechConfig;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisEventArgs;
import com.microsoft.cognitiveservices.speech.SpeechSynthesisResult;
import com.microsoft.cognitiveservices.speech.SpeechSynthesizer;
import com.microsoft.cognitiveservices.speech.StreamStatus;
import com.microsoft.cognitiveservices.speech.util.EventHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.Future;


public class TTSModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private MediaPlayer mediaPlayer = new MediaPlayer();

    public TTSModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "TTSModule";
    }

    /*private void playWav(byte[] mp3SoundByteArray) {
        try {
            // create temp file that will hold byte array
            File tempMp3 = File.createTempFile("audioText", "wav", reactContext.getCacheDir());
            tempMp3.deleteOnExit();
            FileOutputStream fos = new FileOutputStream(tempMp3);
            fos.write(mp3SoundByteArray);
            fos.close();

            mediaPlayer.reset();


            FileInputStream fis = new FileInputStream(tempMp3);
            mediaPlayer.setDataSource(fis.getFD());
            mediaPlayer.prepare();
            Log.d("this", "start playing");
            mediaPlayer.start();


        } catch (IOException ex) {
            String s = ex.toString();
            ex.printStackTrace();
        }
    }*/

    @ReactMethod
    private void textToSpeech(String text, String voiceName, String key, String region, Promise promise) {
        SpeechConfig speechConfig = SpeechConfig.fromSubscription(key,region);
        speechConfig.setSpeechSynthesisVoiceName(voiceName);
        SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig);

        speechSynthesizer.SynthesisCompleted.addEventListener(new EventHandler<SpeechSynthesisEventArgs>() {
            @Override
            public void onEvent(Object o, SpeechSynthesisEventArgs speechSynthesisEventArgs) {
                Log.d("SynthesisCompleted", speechSynthesisEventArgs.toString());

                try {
                    AudioDataStream stream = AudioDataStream.fromResult(speechSynthesisEventArgs.getResult());

                    if (stream.getStatus() == StreamStatus.AllData) {
                        Log.d("this", "i'm playing right now");
                        //playWav(speechSynthesisEventArgs.getResult().getAudioData());
                    }
                    Log.d("resultLoading", AudioDataStream.fromResult(speechSynthesisEventArgs.getResult()).getStatus().toString());

                    Log.d("getAudioData", speechSynthesisEventArgs.getResult().getAudioData().toString());

                    Log.d("getAudioLength", String.valueOf(speechSynthesisEventArgs.getResult().getAudioLength()));
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });

        try {
            // Note: this will block the UI thread, so eventually, you want to register for the event
            speechSynthesizer.SpeakTextAsync(text);
        } catch (Exception ex) {
            Log.e("SpeechSDKDemo", "unexpected " + ex.getMessage());
            assert (false);
        }
    }


}
