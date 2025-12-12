import React, { useEffect, useState } from 'react';
import { 
  ImageBackground, 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  StatusBar, 
  Platform,
} from 'react-native';
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import Entypo from 'react-native-vector-icons/Entypo';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Slider from '@react-native-community/slider';
import { getTtsSetting, updateTtsSetting } from '../../api/setting';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;
const GAP = 15;

const VOICE_OPTIONS = [
  { id: 'ko-KR-SeoHyeonNeural', label: '서현' },
  { id: 'ko-KR-GookMinNeural',  label: '국민' },
  { id: 'ko-KR-SunHiNeural',    label: '선히' },
];

export default function TtsSettingScreen({ navigation }) {
  const queryClient = useQueryClient();

  const [voiceType, setVoiceType] = useState('ko-KR-SeoHyeonNeural');
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [bgm, setBgm] = useState('CALM'); 

  const { data } = useQuery({
    queryKey: ['ttsSetting'],
    queryFn: getTtsSetting,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      if (data.voiceType) setVoiceType(data.voiceType);

      if (data.voiceSpeed != null){
        const parsed = 
            typeof data.voiceSpeed === 'number'
            ?data.voiceSpeed
            : Number(data.voiceSpeed);
        if (!Number.isNaN(parsed)) setVoiceSpeed(parsed);
      }

      if (data.bgm) setBgm(data.bgm);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateTtsSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ttsSetting'] });
      navigation.goBack();
    },
    onError: (error) => {
      console.log('TTS 설정 변경 실패:', error?.response?.data || error.message || error);
    },
  });

  const handleSave = () => {
    if (mutation.isPending) return;

    mutation.mutate({
      voiceType,
      voiceSpeed,
      bgm,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={[styles.header, { top: TOP + 45 }]}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-thin-left" size={30} color={colors.redBrown} />
        </Pressable>

        <Text style={styles.title}>TTS 설정</Text>
      </View>

      <View style={styles.card}>
        <View style={{ height: GAP }} />

        <View style={styles.contentWrap}>
          {/* 목소리 선택 */}
          <View style={[styles.section, styles.voiceSection]}>
            <Text style={styles.sectionTitle}>목소리 선택</Text>

            <View style={styles.voiceRow}>
              {VOICE_OPTIONS.map(option => {
                const selected = voiceType === option.id;
                return (
                  <Pressable
                    key={option.id}
                    style={[
                      styles.voiceButton,
                      selected && styles.voiceButtonSelected,
                    ]}
                    onPress={() => setVoiceType(option.id)}
                    android_ripple={{ color: '#00000014' }}
                  >
                    <Text
                      style={[
                        styles.voiceLabel,
                        selected && styles.voiceLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>읽어주는 속도</Text>

            <View style={styles.sliderRow}>
              <Text style={styles.speedLabel}>0.2배속</Text>
              <Text style={styles.currentSpeedText}>
                {voiceSpeed.toFixed(1)}배속
              </Text>
              <Text style={styles.speedLabel}>3.0배속</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={0.2}
              maximumValue={3.0}
              step={0.1}
              value={Number(voiceSpeed)}
              onValueChange={(val) => {
                if (typeof val === 'number' && !Number.isNaN(val)) setVoiceSpeed(val);
              }}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray300}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        <View style={styles.saveBtnWrap}>
          <ConfirmButton
            text="확인"
            color={colors.primary}
            width={width * 0.8}
            marginBottom={10}
            onPress={handleSave}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'MangoDdobak-B',
    color: colors.redBrown,
    letterSpacing: 0.3,
  },
  card: {
    position: 'absolute',
    top: 129,
    alignSelf: 'center',
    width: width - 32,
    height: height * 0.8,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    paddingTop: 18,
    marginBottom: 16,
  },
  contentWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 32,
  },
  voiceSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'MangoDdobak-B',
    color: colors.redBrown,
    marginBottom: 12,
  },
  voiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  voiceButton: {
    flex: 1,
    height: 44,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  voiceButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  voiceLabel: {
    fontSize: 16,
    fontFamily: 'MangoDdobak-R',
    color: colors.brown,
  },
  voiceLabelSelected: {
    color: colors.white,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  speedLabel: {
    fontSize: 12,
    fontFamily: 'MangoDdobak-R',
    color: colors.gray500,
  },
  currentSpeedText: {
    fontSize: 14,
    fontFamily: 'MangoDdobak-B',
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    marginBottom: 16,
  },
});