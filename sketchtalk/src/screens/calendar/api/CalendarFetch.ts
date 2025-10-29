import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

type DiaryCalendarView = {
  diaryId: number;
  date: string;
  emotion: string;
};

type DiaryListView = {
  diaryId: number;
  date: string;
  title: string;
  emotion: string;
  image_url: string;
};

type CalendarViewQueryReply = {
  statusCode: number;
  message: string;
  data: {
    year: number;
    month: number;
    diaries: DiaryCalendarView[];
  };
  isSuccess: boolean;
};

type ListViewQueryReply = {
  statusCode: number;
  message: string;
  data: DiaryListView[];
  isSuccess: boolean;
};

type DiaryPreviewReply = {
  statusCode: number;
  message: string;
  data: {
    diaryId: number;
    date: string;
    title: string;
    emotion: string;
    content: string; //
    image_url: string;
  };
  isSuccess: boolean;
};

type DiaryViewReply = {
  statusCode: number;
  message: string;
  data: {
    diaryId: number;
    date: string;
    title: string;
    emotion: string;
    content: string;
    image_url: string;
    comment: string;
  };
  isSuccess: boolean;
};

export const useCalendarViewQueryFetch = (month: number, year: number) => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<CalendarViewQueryReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useListViewQueryFetch = (month: number, year: number) => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<ListViewQueryReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryPreviewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<DiaryPreviewReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryViewQueryFetch = (diaryId: number) => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<DiaryViewReply>('about:blank');
    },
    staleTime: 100000,
  });
};
