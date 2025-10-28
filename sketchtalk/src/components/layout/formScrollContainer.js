import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';

/**
 * FormScrollContainer
 * - 입력 폼 화면에서 키보드에 가려지지 않도록 하단 padding 조정
 * - ScrollView + Keyboard 이벤트 결합
 * - children을 함수로 넘기면 scrollTo, scrollToEnd 등을 활용 가능
 */
export default function FormScrollContainer({
  children,
  contentStyle,
  extraPadding = 24, // 기본 여유 패딩 (키보드가 없을 때 하단 여백)
}) {
  // 키보드 높이 감지해서 paddingBottom 업데이트
  const [bottomPad, setBottomPad] = useState(extraPadding);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      const h = e?.endCoordinates?.height ?? 0;
      setBottomPad(h + extraPadding); // 키보드 높이 + 여유 패딩
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => setBottomPad(extraPadding));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [extraPadding]);

  // 스크롤 제어용 ref
  const scrollRef = useRef(null);
  const [containerH, setContainerH] = useState(0);
  const [contentH, setContentH] = useState(0);

  const scrollToEnd = () => scrollRef.current?.scrollToEnd({ animated: true });
  const scrollTo = (y = 80) => scrollRef.current?.scrollTo({ y, animated: true });
  
  // 끝까지 가지 말고, 끝에서 margin 만큼 띄운 위치로
  const scrollNearBottom = (margin = 160) => {
    const maxY = Math.max(contentH - containerH, 0);
    const y = Math.max(maxY - margin, 0);
    scrollRef.current?.scrollTo({ y, animated: true });
  };


  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={[styles.content, contentStyle, { paddingBottom: bottomPad }]}
          keyboardShouldPersistTaps="handled" // 입력창 이외 영역 터치 시 키보드 닫힘
          showsVerticalScrollIndicator={false} // 스크롤바 숨김
          onContentSizeChange={(_, h) => setContentH(h)}
        >
          <View style={styles.inner}>
            {typeof children === 'function'
              ? children({ scrollToEnd, scrollTo,scrollNearBottom, bottomPad }) // 함수형 children 지원
              : children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1, // 내용이 적어도 화면 채우도록
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  inner: { flex: 1 },
});
