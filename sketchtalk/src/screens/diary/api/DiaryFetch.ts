import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

type Chat = {
  statusCode: string;
  message: string;
  data: {
    reply: string;
    isSufficient: boolean;
  };
  isSuccess: boolean;
};

type TextResult = {
  statusCode: string;
  message: string;
  data: {
    title: string;
    content: string;
  };
  isSuccess: boolean;
};

type TextConfirmRequest = {
  userId: number;
  title: string;
  content: string;
};

type TextConfirmReply = {
  statusCode: string;
  message: string;
  data: {
    diaryId: number;
    title: string;
    emotion: string;
    content: string;
  };
  isSuccess: boolean;
};

type ArtResultRequest = {
  userId: number;
  content: string;
};

type ArtResultReply = {
  statusCode: string;
  message: string;
  data: {
    diaryId: number;
    image_url: string;
  };
  isSuccess: boolean;
};

type ArtConfirmRequest = {
  diaryId: number;
  image_url: string;
};

type ArtConfirmReply = {
  statusCode: string;
  message: string;
  data: {
    diaryId: number;
    date: string;
    emotion: string;
    title: string;
    content: string;
    img_url: string;
    comment: string;
    achieved: boolean;
    achieved_list: string[];
  };
  isSuccess: boolean;
};

type DiaryEditRequest = {
  diaryId: number;
  date: string;
  title: string;
  emotion: string;
  content: string;
};

type DiaryEditReply = {
  statusCode: string;
  message: string;
  data: {
    diaryId: number;
    date: string;
    title: string;
    emotion: string;
    content: string;
  };
  isSuccess: boolean;
};

export const useDiaryInitialFetch = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<Chat>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryChatFetch = (dialog: string) => {
  return useQuery({
    queryKey: [{dialog}],
    queryFn: () => {
      return axios.get<Chat>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryGetTextFetch = (userId: number) => {
  return useQuery({
    queryKey: [{userId}],
    queryFn: () => {
      return axios.get<TextResult>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryConfirmTextFetch = (
  TextConfirmRequest: TextConfirmRequest,
) => {
  return useQuery({
    queryKey: [TextConfirmRequest],
    queryFn: () => {
      return axios.get<TextConfirmReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryGetArtFetch = (ArtResultRequest: ArtResultRequest) => {
  return useQuery({
    queryKey: [ArtResultRequest],
    queryFn: () => {
      return axios.get<ArtResultReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryConfirmArtFetch = (
  ArtConfirmRequest: ArtConfirmRequest,
) => {
  return useQuery({
    queryKey: [ArtConfirmRequest],
    queryFn: () => {
      return axios.get<ArtConfirmReply>('about:blank');
    },
    staleTime: 100000,
  });
};

export const useDiaryEditFetch = (DiaryEditRequest: DiaryEditRequest) => {
  return useQuery({
    queryKey: [DiaryEditRequest],
    queryFn: () => {
      return axios.get<DiaryEditReply>('about:blank');
    },
    staleTime: 100000,
  });
};
