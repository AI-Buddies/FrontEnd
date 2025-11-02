import React, { useRef, useState } from 'react';
import { ImageBackground, Dimensions, StyleSheet, View, Text, Pressable, StatusBar, Platform, FlatList } from 'react-native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import InputField from '../../components/inputfield';
import FormScrollContainer from '../../components/layout/formScrollContainer';
import ConfirmButton from '../../components/confirmbutton';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const ITEM_HEIGHT = 100;    // 각 아이템(라벨+인풋)의 고정 높이 추정치
const GAP = 15;

export default function ProfileEditScreen({ navigation }) {
    const [name, setName] = useState('');
    const [bd, setBd] = useState('');
    const [pickerDate, setPickerDate] = useState(new Date(2000,1,1));
    const [showPicker, setShowPicker] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const openPicker = () => setShowPicker(true);
    const onChangeDate = (event, selectedDate) => {
        if (!selectedDate) {
        if (Platform.OS === 'android') setShowPicker(false); 
        return;
        } setPickerDate(selectedDate);
    
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        setBd(`${yyyy}년 ${mm}월 ${dd}일`);
    
        if (Platform.OS === 'android') setShowPicker(false);
    }

    const onSave = () => {
        navigation.goBack();
    }
    
    const flatRef = useRef(null);
    const focusScrollTo = (index) => {
        flatRef.current?.scrollToIndex?.({index, animated: true});
    };
    const fields = [
        {
            key: 'name',
            render: () => (
                <InputField
                    label="이름"
                    placeholder="이름"
                    value={name}
                    onChangeText={setName}
                    keyboardType="default"
                    onFocus={() => focusScrollTo(0)}
                />
            ),
        },
        {
            key: 'bd',
            render: () => (
                <>
                <InputField
                    label="생년월일"
                    placeholder="2000년 01월 01일"
                    value={bd}
                    onPressIn={() => {
                        focusScrollTo(1);
                        openPicker();
                    }}
                    showSoftInputOnFocus={false}
                    keyboardType= "numeric"
                />
                {showPicker && (
                    <DateTimePicker 
                        value={pickerDate}
                        mode="date"
                        display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                        maximumDate={new Date()}
                        onChange={onChangeDate}
                    />
                )}
                </>
            ),
        },
        {
            key: 'id',
            render: () => (
                <InputField
                    label="아이디"
                    placeholder="아이디"
                    value={id}
                    onChangeText={setId}
                    keyboardType="ascii-capable"
                    onFocus={() => focusScrollTo(2)}
                />
            ),
        },
        {
            key: 'pw',
            render: () => (
                <InputField
                    label="비밀번호"
                    placeholder="비밀번호"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => focusScrollTo(3)}
                />
            ),
        },
        {
            key: 'pwcheck',
            render: () => (
                <InputField
                    label="비밀번호확인"
                    placeholder="비밀번호"
                    secureTextEntry
                    onFocus={() => focusScrollTo(4)}
                />
            ),
        },
    ];

    const renderItem = ({item}) => (
        <View style={styles.itemWrap}>{item.render()}</View>
    );

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

            <Text style={styles.title}>개인 정보 수정</Text>
        </View>

        <View style={styles.card}>
            <View style={{height: GAP}}/>
            <FlatList
                ref={flatRef}
                data={fields}
                keyExtractor={(i) => i.key}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={styles.cardContent}
                initialNumToRender={6}
                windowSize={8}
                removeClippedSubviews

                ItemSeparatorComponent={() => <View style={{height: GAP}}/>}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT + GAP,
                    offset: (ITEM_HEIGHT + GAP) * index,
                    index,
                })}
            />
            <View style={styles.saveBtnWrap}>
                <ConfirmButton
                    text="저장"
                    color={colors.primary}
                    width={width * 0.8}
                    marginBottom={10}
                    onPress={onSave}
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
    cardContent: {
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 16,
    },
    itemWrap: {
        height: ITEM_HEIGHT,
        justifyContent: 'flex-start',
    },
    saveBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
});