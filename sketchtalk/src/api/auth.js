import client from './client';
import { saveTokens, getRefreshToken } from './tokenStorage';

// 공통 응답 파서
function parseResponse(res) {
  const { isSuccess, message, data } = res?.data ?? {};
  if (!isSuccess) {
    throw new Error(message || '요청에 실패했습니다.');
  }
  return data;
}

// 회원가입
// payload : { userId, password, name, birth }
export async function registerUser(payload) {
  const res = await client.post('/user/register', payload);
  return parseResponse(res);
}

// 로그인
// { userId, password }
export async function loginUser(body) {
  const res = await client.post('/user/login', body);
  const data = parseResponse(res); // { nickname, accessToken, refreshToken }

  const accessToken = data?.accessToken || data?.token;
  const refreshToken = data?.refreshToken;

  if (!accessToken) {
    throw new Error('서버에서 accessToken을 받지 못했습니다.');
  }

  await saveTokens({ accessToken, refreshToken });
  return data; // nickname, accessToken, refreshToken 반환
}

// 토큰 재발급
export async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

  const res = await client.post('/refresh', { refreshToken });
  const data = parseResponse(res);

  const accessToken = data?.accessToken || data?.token;
  if (!accessToken) {
    throw new Error('서버에서 새 accessToken을 받지 못했습니다.');
  }

  await saveTokens({ accessToken, refreshToken });
  return accessToken;
}