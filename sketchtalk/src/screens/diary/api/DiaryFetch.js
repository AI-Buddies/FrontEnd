import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

export const useDiaryInitialFetch = {
  queryKey: ['useDiaryChatFetch'],
  queryFn: () => {
    return axios.get('about:blank');
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
    return axios.post('about:blank', {dialog: dialog});
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
    return axios.post('about:blank', {userId: userId});
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
    return axios.post('about:blank', {
      userId: userId,
      title: title,
      content: content,
    });
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
    return axios.post('about:blank', {
      userId: userId,
      content: content,
    });
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
    return axios.post('about:blank', {
      diaryId: diaryId,
      image_url: image_url,
    });
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
    return axios.put('about:blank', {
      diaryId: diaryId,
      date: date,
      title: title,
      emotion: emotion,
      content: content,
    });
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
