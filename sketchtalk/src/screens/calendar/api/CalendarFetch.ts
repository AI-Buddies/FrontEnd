import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const ls = require('local-storage');

export const useCalendarViewQueryFetch = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const token = ls('token');
  //console.log(date);
  //console.log(month);
  //console.log(year);
  return useQuery({
    queryKey: ['useCalendarViewQueryFetch', date],
    queryFn: () => {
      return axios.get(
        `https://sketch-talk.com/diary/cal?year=${year}&month=${month}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
  });
};

export const useListViewQueryFetch = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const token = ls('token');
  return useQuery({
    queryKey: ['useListViewQueryFetch', date],
    queryFn: () => {
      return axios.get(
        `https://sketch-talk.com/diary/list?year=${year}&month=${month}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    staleTime: 100000,
  });
};

export const useDiaryViewQueryFetch = (diaryId: number) => {
  const token = ls('token');
  return useQuery({
    queryKey: ['useDiaryViewQueryFetch'],
    queryFn: () => {
      return axios.get(`https://sketch-talk.com/diary/${diaryId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    },
    staleTime: 100000,
  });
};
