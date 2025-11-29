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