import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_KEY = '@sketchtalk/accessToken';
const REFRESH_KEY = '@sketchtalk/refreshToken';
const ls = require('local-storage');

// 토큰 저장
export async function saveTokens({accessToken, refreshToken}) {
  try {
    if (accessToken) {
      ls('token', accessToken);
      await AsyncStorage.setItem(ACCESS_KEY, accessToken);
    }
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_KEY, refreshToken);
    }
  } catch (e) {
    console.log('saveTokens error:', e);
  }
}

// 액세스 토큰 가져오기
export async function getAccessToken() {
  try {
    return await AsyncStorage.getItem(ACCESS_KEY);
  } catch (e) {
    console.log('getAccessToken error:', e);
    return null;
  }
}

// 리프레시 토큰 가져오기
export async function getRefreshToken() {
  try {
    return await AsyncStorage.getItem(REFRESH_KEY);
  } catch (e) {
    console.log('getRefreshToken error:', e);
    return null;
  }
}

// 둘 다 한 번에
export async function loadTokens() {
  const [accessToken, refreshToken] = await Promise.all([
    getAccessToken(),
    getRefreshToken(),
  ]);
  return {accessToken, refreshToken};
}

// 로그아웃용 – 토큰 삭제
export async function clearTokens() {
  try {
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
  } catch (e) {
    console.log('clearTokens error:', e);
  }
}
