import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

type Chat = {
  statusCode: number;
  message: string;
  data: {
    reply: string;
    isSufficient: boolean;
  };
  isSuccess: boolean;
};

type TextResult = {
  statusCode: number;
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
  statusCode: number;
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
  statusCode: number;
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
  statusCode: number;
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
  statusCode: number;
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

export const useDiaryInitialFetch = {
  queryKey: ['useDiaryChatFetch'],
  queryFn: () => {
    return axios.get<Chat>('about:blank');
  },
};

export const useDiaryChatFetch = useMutation({
  mutationFn: (dialog: string) => {
    return axios.post<Chat>('about:blank', dialog);
  },
});

export const useDiaryGetTextFetch = useMutation({
  mutationFn: (userId: number) => {
    return axios.post<TextResult>('about:blank', userId);
  },
});

export const useDiaryConfirmTextFetch = useMutation({
  mutationFn: (TextConfirmRequest: TextConfirmRequest) => {
    return axios.post<TextConfirmReply>('about:blank', TextConfirmRequest);
  },
});

export const useDiaryGetArtFetch = useMutation({
  mutationFn: (ArtResultRequest: ArtResultRequest) => {
    return axios.post<ArtResultReply>('about:blank', ArtResultRequest);
  },
});

export const useDiaryConfirmArtFetch = useMutation({
  mutationFn: (ArtConfirmRequest: ArtConfirmRequest) => {
    return axios.post<ArtConfirmReply>('about:blank', ArtConfirmRequest);
  },
});

export const useDiaryEditFetch = useMutation({
  mutationFn: (DiaryEditRequest: DiaryEditRequest) => {
    return axios.put<DiaryEditReply>('about:blank', DiaryEditRequest);
  },
});
