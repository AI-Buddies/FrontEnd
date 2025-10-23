import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';

function ChallengeTask({
    title,
    image,
    done = 0,
    total = 0,
    onPress,
    style,

    disabled = false,
    completed,  // 완료여부
    })  {
        const safeTotal = Math.max(total, 0);
        const ratio = safeTotal === 0 ? 0 : Math.min(1, Math.max(0, done / safeTotal));
        const isCompleted = typeof completed === 'boolean' ? completed : (safeTotal > 0 && done >= safeTotal);

    return(
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
                disabled && styles.cardDisabled,
                style,
            ]}
            android_ripple={{ color: '#00000014', borderless: false }}
        >

          {isCompleted && (
                    <Image source={require('../assets/challenge/challengeStamp.png')} style={styles.badge} resizeMode="contain" />
          )}

            <View style={styles.imageWrap}>
                <Image
                    source={image}
                    resizeMode="contain"
                    style={[styles.image, disabled && styles.disabledItem]}
                />
            </View>

            <Text numberOfLines={1} style={[styles.title, disabled && styles.disabledText]}>{title}</Text>
            <Text style={[styles.countText, disabled && styles.disabledText]}>{done} / {safeTotal}</Text>
            <View style={styles.progressTrack}>
                <View style={[
                    styles.progressFill,
                    {width: `${ratio * 100}%`, backgroundColor: isCompleted ? colors.primary : colors.blue,}
                ]}
                />
            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.white,
    elevation: 3,
  },
  cardPressed: {
    elevation: 1,
    transform: [{ scale: 0.99 }],
  },
  imageWrap: {
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: 68,
    height: 68,
  },
  badge: {
    position: 'absolute',
    top: -25,
    left: -25,
    width: 90,
    height: 90,
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  countText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  progressTrack: {
    marginTop: 8,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.gray200,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  cardDisabled: {
    backgroundColor: colors.gray100,
  },
  disabledText:{
    color: colors.gray300,
  },
  disabledItem:{
    opacity: 0.4,
  },
});

export default memo(ChallengeTask);