import React from 'react';
import { View, Text, Pressable, Switch, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../constants/colors';

export default function MypageField({
    text,
    pressable = true,
    onPress,    // 터치시 콜백
    switchValue = false,
    rightType = 'none', // 오른쪽 (아래, 오른쪽, 스위치, 없음)
    divider = 'thin',   // 하단구분선 (두껍거나, 얇거나)
    disabled = false,
    style,
    textStyle,
    highlight,
    rightRotate = 0,
}) {
    const isPressable = pressable && !disabled;

    const Right = () => {
        switch(rightType){
            case 'switch':
                return (
                    <Switch 
                        value={switchValue}
                        onValueChange={onPress}
                        trackColor={{false: colors.gray300, true: colors.primary}}
                        thumbColor={colors.white}
                    />
                );
            case 'down':
                return <Entypo name="chevron-down" size={24} color={colors.redBrown} /> //
            case 'right':
                return <Entypo name="chevron-right" size={24} color={colors.redBrown} />; //
            default: return null;
        }
    };

    const Divider = (
        <View style={[
            styles.dividerBase,
            divider === 'thin' ? styles.dividerThin : styles.dividerThick,
      ]}/>);

    return (
        <View>
            <Pressable
                onPress={isPressable ? onPress : undefined}
                android_ripple={isPressable ? { color: '#00000014' } : undefined}
                style={({ pressed }) => [
                styles.row,
                style,
                disabled && { opacity: 0.5 },
                pressed && isPressable ? { backgroundColor: colors.gray100 } : null,
                ]}>
                <View style={styles.textWrap}>
                    {highlight ? (
                        <>
                        <Text style={styles.highlight}>{highlight}</Text>
                        <Text style={[styles.text, textStyle]}>
                        {' '}{text} </Text>
                        </>
                    ) : (
                        <Text style={[styles.text, textStyle]}>
                            {text}
                        </Text>
                )}
                </View>
                <View style={[styles.rightWrap, { transform: [{ rotate: `${rightRotate}deg` }] }]}>
                    <Right />
                </View>
            </Pressable>
            {Divider}
        </View>
    );
}

const ROW_HEIGHT=56;

const styles = StyleSheet.create({
    row: {
        minHeight: ROW_HEIGHT,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    textWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 20,
    },
    rightWrap: {
        marginLeft: 12,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    highlight: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '600',
    },
    text: {
        fontSize: 16,
        fontFamily: 'MangoDdobak-R',
        color: colors.brown,
    },
    dividerBase: { width: '100%' },
    dividerThin: { height: StyleSheet.hairlineWidth, backgroundColor: colors.gray200 },
    dividerThick: { height: 8, backgroundColor: colors.gray200 },
});