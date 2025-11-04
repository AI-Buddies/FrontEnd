import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

const token = '';

const authConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export const useDiaryInitialFetch = {
  queryKey: ['useDiaryChatFetch'],
  queryFn: () => {
    return axios.get('about:blank', authConfig);
    /*type Chat = {
        statusCode: number;
        message: string;
        data: {
           reply: string;
           isSufficient: boolean;
         };
         isSuccess: boolean;
    };*/
  },
};

export const useDiaryChatFetch = useMutation({
  mutationFn: dialog => {
    return axios.post('about:blank', {dialog: dialog}, authConfig);
    /*type Chat = {
        statusCode: number;
        message: string;
        data: {
           reply: string;
           isSufficient: boolean;
         };
         isSuccess: boolean;
    };*/
  },
});

export const useDiaryGetTextFetch = useMutation({
  mutationFn: userId => {
    return axios.post('about:blank', {userId: userId}, authConfig);
    /*type TextResult = {
         statusCode: number;
         message: string;
         data: {
             title: string;
            content: string;
           };
      isSuccess: boolean;
    };*/
  },
});

export const useDiaryConfirmTextFetch = useMutation({
  mutationFn: ({userId, title, content}) => {
    return axios.post(
      'about:blank',
      {
        userId: userId,
        title: title,
        content: content,
      },
      authConfig,
    );
    /*type TextConfirmReply = {
         statusCode: number;
         message: string;
         data: {
            diaryId: number;
            title: string;
            emotion: string;
            content: string;
          };
         isSuccess: boolean;
      };*/
  },
});

export const useDiaryGetArtFetch = useMutation({
  mutationFn: ({userId, content}) => {
    return axios.post(
      'about:blank',
      {
        userId: userId,
        content: content,
      },
      authConfig,
    );
    /*type ArtResultReply = {
        statusCode: number;
        message: string;
        data: {
          diaryId: number;
          image_url: string;
      };
      isSuccess: boolean;
      };*/
  },
});

export const useDiaryConfirmArtFetch = useMutation({
  mutationFn: ({diaryId, image_url}) => {
    return axios.post(
      'about:blank',
      {
        diaryId: diaryId,
        image_url: image_url,
      },
      authConfig,
    );
    /*type ArtConfirmReply = {
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
    };*/
  },
});

export const useDiaryEditFetch = useMutation({
  mutationFn: ({diaryId, date, title, emotion, content}) => {
    return axios.put(
      'about:blank',
      {
        diaryId: diaryId,
        date: date,
        title: title,
        emotion: emotion,
        content: content,
      },
      authConfig,
    );
    /*type DiaryEditReply = {
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
    };*/
  },
});
