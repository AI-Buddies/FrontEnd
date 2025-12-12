import React from 'react';
import { ImageBackground, Dimensions, StyleSheet, View, Text, Pressable, StatusBar, Platform } from 'react-native';
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import Entypo from 'react-native-vector-icons/Entypo';
import { useQuery } from '@tanstack/react-query';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;
const GAP = 15;

export default function TtsSettingScreen({ navigation }) {


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
            <View style={{height: GAP}}/>

            <View style={styles.saveBtnWrap}>
                <ConfirmButton
                    text="저장"
                    color={colors.primary}
                    width={width * 0.8}
                    marginBottom={10}
                    onPress={() => {}}
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
      infoText:{
        fontSize: 16,
        fontFamily: 'MangoDdobak-R',
        color: colors.redBrown,
      },
    saveBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
});