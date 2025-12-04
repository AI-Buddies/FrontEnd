import React, {useState} from 'react';
import { ImageBackground, Dimensions, StyleSheet, View, Text, Pressable, StatusBar, Platform, FlatList, LayoutAnimation } from 'react-native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MypageField from '../../components/mypagefield';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPastNotificationSetting,
  updatePastNotificationSetting,
  getWriteNotificationSetting,
  updateWriteNotificationSetting,
} from '../../api/setting';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const ALARM_ITEMS = [
    {id: 'all', text : '전체 알람'},
    {id: 'past', text : '과거 알림'},
    {id: 'write', text : '작성 알림'},
]

export default function AlarmSettingScreen({ navigation }) {
    const queryClient = useQueryClient();

    const {
        data: pastData,
        isLoading : pastLoading,
        isError : pastError,
    } = useQuery({
        queryKey: ['notification', 'past'],
        queryFn: getPastNotificationSetting,
    });

    const {
        data: writeData,
        isLoading: writeLoading,
        isError: writeError,
    } = useQuery({
        queryKey: ['notification', 'write'],
        queryFn: getWriteNotificationSetting,
    });

    const loading = pastLoading || writeLoading;
    const error = pastError || writeError;

    const pastMutation = useMutation({
        mutationFn: updatePastNotificationSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notification', 'past'] });
        },
    });

    const writeMutation = useMutation({
        mutationFn: updateWriteNotificationSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notification', 'write'] });
        },
    });

    const isMutating = pastMutation.isPending || writeMutation.isPending;

    const pastOn = pastData?.canNotify ?? false;
    const writeOn = writeData?.canNotify ?? false;
    const allOn = pastOn && writeOn;

    const handleToggle = (id, value) => {
        if (loading || isMutating || !pastData || !writeData) return;

        if(id ==='all'){
            pastMutation.mutate({
                canNotify: value,
                notificationTime: pastData.notificationTime,
                notificationValue: pastData.notificationValue,
                notificationUnit: pastData.notificationUnit,
            });
            writeMutation.mutate({
                canNotify: value,
                notificationTime: writeData.notificationTime,
                notificationUnit: writeData.notificationUnit,
            });
            return;
        }
        if(id ==='past'){
            pastMutation.mutate({
                canNotify: value,
                notificationTime: pastData.notificationTime,
                notificationValue: pastData.notificationValue,
                notificationUnit: pastData.notificationUnit,
            });
            return;
        }
        if(id ==='write'){
            writeMutation.mutate({
                canNotify: value,
                notificationTime: writeData.notificationTime,
                notificationUnit: writeData.notificationUnit,
            });
            return;
        }
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

            <Text style={styles.title}>알람 설정</Text>
        </View>

        <View style={styles.card}>    
            {loading && (
                <View>
                    <Text>로딩중</Text>
                </View>
            )}      
            {error && !loading && (
                <View>
                    <Text>알람 설정 못 불러옴</Text>
                </View>
            )}
            {!loading && !error && (
            <FlatList
                data = {ALARM_ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    let value = false;

                    if(item.id === 'all') value = allOn;
                    if(item.id === 'past') value = pastOn;
                    if(item.id === 'write') value = writeOn;

                    <MypageField
                        text={item.text}
                        pressable={false}
                        rightType="switch"
                        switchValue={value}
                        onPress={(v) => handleToggle(item.id, v)}
                        disabled={isMutating}
                    />
                }} 
            />)}
        </View>
    </ImageBackground>
  );
}

const CARD_MAX_H = height * 0.8;
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
    height: CARD_MAX_H,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    paddingTop: 18,
    marginBottom: 16,
},
});