import client from './client';
import { saveTokens, getRefreshToken, clearTokens } from './tokenStorage';

// 공통 응답 파서
function parseResponse(res) {
  const { isSuccess, message, data } = res?.data ?? {};
  if (!isSuccess) {
    throw new Error(message || '요청에 실패했습니다.');
  }
  return data;
}

// 회원가입
export async function registerUser({ userId, password, name, birth }) {
  // 서버 스펙에 맞게 매핑
  const body = {
    loginId: userId,
    password: password,
    nickname: name,
    birthdate: birth,
    //deviceToken: 
    //deviceType: 'ANDROID',
    //deviceIdentifier: 
  };

  const res = await client.post('/user/register', body);
  const data = parseResponse(res); // { nickname, accessToken, refreshToken }

  const accessToken = data?.accessToken;
  const refreshToken = data?.refreshToken;

  if (accessToken) {
    await saveTokens({ accessToken, refreshToken });
  }

  return data; // 필요하면 닉네임 등 사용 가능
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

// 로그아웃
export async function logoutUser(deviceIdentifier) {
  const res = await client.post('/user/logout', { deviceIdentifier });

  const { data, isSuccess, message } = res.data;
  if (!isSuccess) throw new Error(message || '로그아웃 실패');

  // 서버에서는 새 access/refreshToken을 내려주지만
  // 클라이언트에서는 로그아웃이므로 삭제
  await clearTokens();

  return data;
}

export async function deleteUser() {
  const res = await client.delete('/user');
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '회원탈퇴에 실패했습니다.');
  }

  await clearTokens();
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