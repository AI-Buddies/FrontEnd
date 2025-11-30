import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ImageBackground, Dimensions, StyleSheet, View, Text, Pressable, StatusBar, Platform, FlatList } from 'react-native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import InputField from '../../components/inputfield';
import ConfirmButton from '../../components/confirmbutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import client from '../../api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../api/auth';
import Popup from '../../components/popup';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const ITEM_HEIGHT = 100;    // 각 아이템(라벨+인풋)의 고정 높이 추정치
const GAP = 15;

async function fetchProfile() {
    const res = await client.get('/setting');
    const { data, isSuccess, message } = res.data;

    if(!isSuccess){
        throw new Error(message || '회원 정보를 불러오지 못했습니다.');
    }

    return data;
}

export default function ProfileEditScreen({ navigation }) {
    const queryClient = useQueryClient();

    const [name, setName] = useState('');
    const [bd, setBd] = useState('');
    const [birthRaw, setBirthRaw] = useState('');
    const [pickerDate, setPickerDate] = useState(new Date(2000,1,1));
    const [showPicker, setShowPicker] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [pwCheck, setPwCheck] = useState('');

    const [idChecker, setIDchecker] = useState(false);
    const [idCheckStatus, setIdCheckStatus] = useState(''); // 'error' | 'success'
    const [idCheckMsg, setIdCheckMsg] = useState('');
    const [checking, setChecking] = useState(false);  

    const [errorOpen, setErrorOpen] = useState(false);
    const [cautionOpen, setCautionOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const idValid = useMemo(() => id.trim().length >= 4, [id]);
    const pwSame  = useMemo(() => (
        password && pwCheck && password === pwCheck
    ), [password, pwCheck]);

    const {
        data: profile,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['setting'],
        queryFn: fetchProfile,
    });

    useEffect(() => {
        if (!profile) return;

        setName(profile.nickname || '');
        setId(profile.loginId || '');

        if (profile.birthdate) {
            setBirthRaw(profile.birthdate);
            const [yyyy, mm, dd] = profile.birthdate.split('-');
            setBd(`${yyyy}년 ${mm}월 ${dd}일`);
            setPickerDate(new Date(Number(yyyy), Number(mm) - 1, Number(dd)));
        }
    }, [profile]);

    const openPicker = () => setShowPicker(true);
    const onChangeDate = (event, selectedDate) => {
        if (!selectedDate) {
        if (Platform.OS === 'android') setShowPicker(false); 
        return;
        } setPickerDate(selectedDate);
    
        const yyyy = selectedDate.getFullYear();
        const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(selectedDate.getDate()).padStart(2, '0');
        const iso = `${yyyy}-${mm}-${dd}`;
        setBirthRaw(iso);
        setBd(`${yyyy}년 ${mm}월 ${dd}일`);
    
        if (Platform.OS === 'android') setShowPicker(false);
    }
    const checkID = async () => {
        if(!idValid){
        setIDchecker(true);
        setIdCheckOpen(true);
        setIdCheckStatus('error');
        setIdCheckMsg('4자 이상 입력해주세요.');
        return;
        }

        try {
        setChecking(true);

        const res = await axios.get('https://sketch-talk.com/user/id/availability', {
            params: {
            loginId: id.trim(),
            },
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            },
        });

        const { isSuccess, message, data } = res?.data ?? {};
        if (!isSuccess) throw new Error(message || '중복확인 실패');

        const available = data?.isAvailable ?? false;

        setIDchecker(true);

        if (available) {
            setIdCheckStatus('success');
            setIdCheckMsg('사용 가능한 아이디입니다.');
        } else {
            setIdCheckStatus('error');
            setIdCheckMsg('이미 사용중인 아이디입니다.');
        }

        } catch (e) {
        console.log('ID CHECK ERROR:', e?.response?.data || e.message || e);

        setIDchecker(true);
        setIdCheckStatus('error');
        setIdCheckMsg('중복확인 중 오류 발생');
        } finally {
        setChecking(false);
        }
    };

    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ['setting'] });
            setConfirmOpen(true);
        },
        onError: (err) => {
            console.log('🔴 회원정보 수정 실패 onError:', err?.response?.data || err.message || err);
            setErrorOpen(true);
        },
    });

    const onSave = () => {
        if (!name || !id || !birthRaw || !password || !pwCheck) {
            setCautionOpen(true);
            return;
        }
        if (!idValid || !pwSame || idCheckStatus !== 'success') {
            setCautionOpen(true);
            return;
        }

        const body = {
            loginId: id,
            password: password,
            nickname: name,
            birthdate: birthRaw,
        };
        updateMutation.mutate(body);
    }

    const flatRef = useRef(null);
    const focusScrollTo = (index) => {
        flatRef.current?.scrollToIndex?.({index, animated: true});
    };

    if (isLoading) {
      return (
        <View>
          <Text>로딩 중...</Text>
        </View>
      );
    }
    
    if (error) {
      return (
        <View>
          <Text>오류가 발생했습니다</Text>
        </View>
      );
    }

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
                    onChangeText={(t) => {
                        setId(t);
                        setIDchecker(false);
                        setIdCheckStatus('');
                        setIdCheckMsg('');
                    }}
                    keyboardType="ascii-capable"
                    rightButtonText="중복확인"
                    onRightPress={checking? undefined : checkID}
                    helperVisible={idChecker}
                    helperStatus={idCheckStatus || 'default'} // 'error' | 'success' | 'default'
                    helperText= {idCheckMsg}
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
                    value={pwCheck}
                    onChangeText={setPwCheck}
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
                    onPress={() => setEditOpen(true)}
                />
            </View>
            <Popup
                visible={errorOpen}
                message="회원정보 수정에 실패했습니다."
                onClose={() => setErrorOpen(false)}
                primary={{
                    text: '확인',
                    variant: 'primary',
                    onPress: () => setErrorOpen(false),
                }}
            />
            <Popup
                visible={cautionOpen}
                message="모든 항목을 입력하거나 비밀번호를 확인해주세요."
                onClose={() => setCautionOpen(false)}
                primary={{
                    text: '확인',
                    variant: 'primary',
                    onPress: () => setCautionOpen(false),
                }}
            />
            <Popup
                visible={editOpen}
                message="회원정보를 수정하시겠습니까?"
                onClose={() => setEditOpen(false)}
                secondary={{
                    text:'취소',
                    variant: 'gray',
                    onPress: () => setEditOpen(false),
                }}
                primary={{
                    text:'확인',
                    variant: 'primary',
                    onPress: () => {
                        setEditOpen(false);
                        onSave();
                    }
                }}
            />
            <Popup
                visible={confirmOpen}
                message="회원정보가 수정되었습니다."
                onClose={() => {
                    setConfirmOpen(false);
                    navigation.goBack();
                }}
                primary={{
                    text: '확인',
                    variant: 'primary',
                    onPress: () => {
                        setConfirmOpen(false);
                        navigation.goBack();
                    }
                }}
            />
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