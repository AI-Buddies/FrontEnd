import {useQuery} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

const token = '';

export const authConfig = {
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

/*export const useDiaryChatFetch = useMutation({
  mutationFn: dialog => {
    return axios.post('https://sketch-talk.com/', {dialog: dialog}, authConfig);
  },
  onMutate: userDialog => {
    AddUserMessage(userDialog, false);
    AddWaitingMessage();
  },
  onSuccess:
    AddFetchedMessage => (data, variables, onMutateResult, context) => {
      AddFetchedMessage(data.reply);
    },
});*/

/*export const useDiaryGetTextFetch = useQuery({
  queryKey: ['useDiaryGetTextFetch'],
  queryFn: userId => {
    return axios.post('https://sketch-talk.com/', {userId: userId}, authConfig);
    
  },
}); 
*/

export function useDiaryGetTextFetch(userId) {
  return useQuery({
    queryKey: ['useDiaryGetTextFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/',
        {userId: userId},
        authConfig,
      );
    },
  });
}

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

/*export const useDiaryGetArtFetch = useMutation({
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
  },
});
*/

export function useDiaryGetArtFetch(userId, content, style) {
  return useQuery({
    queryKey: ['useDiaryGetArtFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/',
        {
          userId: userId,
          content: content,
          style: style,
        },
        authConfig,
      );
    },
  });
}

export function useDiaryConfirmArtFetch(diaryId, image_url) {
  return useQuery({
    queryKey: ['useDiaryConfirmArtFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/',
        {
          diaryId: diaryId,
          image_url: image_url,
        },
        authConfig,
      );
    },
  });
}

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

export function useDiaryRedrawImageFetch(content, style, prevImage) {
  return useQuery({
    queryKey: ['useDiaryConfirmArtFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/',
        {
          content: content,
          style: style,
          prevImage: prevImage,
        },
        authConfig,
      );
    },
  });
}
