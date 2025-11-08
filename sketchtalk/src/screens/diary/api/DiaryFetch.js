import {useQuery} from '@tanstack/react-query';
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

export const useDiaryInitialFetch = useQuery({
  queryKey: ['useDiaryChatFetch'],
  queryFn: () => {
    return axios.get('https://sketch-talk.com/', authConfig);
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

export const useDiaryChatFetch = useMutation({
  mutationFn: dialog => {
    return axios.post('https://sketch-talk.com/', {dialog: dialog}, authConfig);
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
    return axios.post('https://sketch-talk.com/', {userId: userId}, authConfig);
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
      'https://sketch-talk.com/',
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
  mutationFn: ({userId, content, style}) => {
    return axios.post(
      'https://sketch-talk.com/',
      {
        userId: userId,
        content: content,
        style: style,
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
      'https://sketch-talk.com/',
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
      'https://sketch-talk.com/',
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

export const useDiaryRedrawImageFetch = useMutation({
  mutationFn: ({diaryId, content, prevImage, style}) => {
    return axios.put(
      'https://sketch-talk.com/',
      {
        diaryId: diaryId,
        content: content,
        prevImage: prevImage,
        style: style,
      },
      authConfig,
    );
    /*type DiaryEditReply = {
        statusCode: number;
        message: string;
        data: {
          "diaryId" : 1,
			    "imageUrl" : "sketchtalk.s3.~~2",
			    "prevImageUrl" : "sketchtalk.s3.~~"
        };
        isSuccess: boolean;
    };*/
  },
});
