import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const token = 'notatoken';

const authConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export const useCalendarViewQueryFetch = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  console.log(date);
  console.log(month);
  console.log(year);
  return useQuery({
    queryKey: ['useCalendarViewQueryFetch', date],
    queryFn: () => {
      return axios.get(
        `https://sketch-talk.com/diary/cal?year=${year}&month=${month}`,
        authConfig,
      );
    },
  });
};

export const useListViewQueryFetch = (date: Date) => {
  const month = date.getMonth;
  const year = date.getFullYear;
  return useQuery({
    queryKey: ['useListViewQueryFetch', date],
    queryFn: () => {
      return axios.get(
        `https://sketch-talk.com/diary/list?year=${year}&month=${month}`,
        authConfig,
      );
    },
    staleTime: 100000,
  });
};

export const useDiaryPreviewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: ['useDiaryPreviewQueryFetch'],
    queryFn: () => {
      return axios.get(
        `https://sketch-talk.com/diary/${diaryId}/preview`,
        authConfig,
      );
    },
    staleTime: 100000,
  });
};

export const useDiaryViewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: ['useDiaryViewQueryFetch'],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/diary/${diaryId}`, authConfig);
    },
    staleTime: 100000,
  });
};
