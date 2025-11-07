import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const token = '';

const authConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export const useCalendarViewQueryFetch = (date: Date) => {
  const month = date.getMonth;
  const year = date.getFullYear;
  return useQuery({
    queryKey: ['useCalendarViewQueryFetch', date],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/${year}/${month}`, authConfig);
    },
    staleTime: 100000,
  });
};

export const useListViewQueryFetch = (date: Date) => {
  const month = date.getMonth;
  const year = date.getFullYear;
  return useQuery({
    queryKey: ['useListViewQueryFetch', date],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/${year}/${month}`, authConfig);
    },
    staleTime: 100000,
  });
};

export const useDiaryPreviewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: ['useDiaryPreviewQueryFetch'],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/${diaryId}`, authConfig);
    },
    staleTime: 100000,
  });
};

export const useDiaryViewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: ['useDiaryViewQueryFetch'],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/${diaryId}`, authConfig);
    },
    staleTime: 100000,
  });
};
