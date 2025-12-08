import client from './client';

export async function getAchievementList(status = 'all') {
  const res = await client.get('/achievement', {
    params: { status },
  });
  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '도전과제 목록을 불러오지 못했습니다.');
  }

  // data : [{ categoryId, categoryName, completed, total, isCompleted }, ...]
  return data;
}

export async function getAchievementDetail(id, status = 'all') {
  const res = await client.get(`/achievement/${id}`, {
    params: { status },
  });

  const { data, isSuccess, message } = res.data;

  if (!isSuccess) {
    throw new Error(message || '도전과제 상세를 불러오지 못했습니다.');
  }

  // data: { categoryId, categoryName, completed, total, isCompleted, subCategories: [...] }
  return data;
}