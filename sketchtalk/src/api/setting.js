import client from './client';

export async function getAppInfo() {
  const res = await client.get('/setting/appinfo');
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '앱 정보를 불러오지 못했습니다.');
  }

  return data;
}

export async function getQuestionList() {
  const res = await client.get('/setting/question');
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '문의 목록을 불러오지 못했습니다.');
  }

  // data.list = [{ question, answer }, ...]
  return data.list || [];    

}

export async function getPastNotificationSetting() {
  const res = await client.get('/setting/notification/past');
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '과거 알림 설정을 불러오지 못했습니다.');
  }

  return data;
}

export async function updatePastNotificationSetting(body) {
  const res = await client.put('/setting/notification/past', body);
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '과거 알림 설정 변경에 실패했습니다.');
  }

  return data;
}

export async function getWriteNotificationSetting() {
  const res = await client.get('/setting/notification/write');
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '작성 알림 설정을 불러오지 못했습니다.');
  }

  return data;
}

export async function updateWriteNotificationSetting(body) {
  const res = await client.put('/setting/notification/write', body);
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '작성 알림 설정 변경에 실패했습니다.');
  }

  return data;
}