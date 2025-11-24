import {useQuery} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

const ls = require('local-storage');

export const useDiaryInitialFetch = useQuery({
  queryKey: ['useDiaryChatFetch'],
  queryFn: () => {
    return axios.get('https://sketch-talk.com/', authConfig);
  },
});

export function useDiaryGetTextFetch(userId) {
  const token = ls('token');
  return useQuery({
    queryKey: ['useDiaryGetTextFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/chat/diary',
        {userId: userId},
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
}

export const useDiaryConfirmTextFetch = useMutation({
  mutationFn: ({userId, title, content}) => {
    const token = ls('token');
    return axios.post(
      'https://sketch-talk.com/',
      {
        userId: userId,
        title: title,
        content: content,
      },
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

export function useDiaryGetArtFetch(diaryId, content, style) {
  const token = ls('token');
  return useQuery({
    queryKey: ['useDiaryGetArtFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/chat/image',
        {
          diaryId: diaryId,
          content: content,
          style: style,
        },
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
}

export function useDiaryConfirmArtFetch(diaryId, image_url) {
  const token = ls('token');
  return useQuery({
    queryKey: ['useDiaryConfirmArtFetch'],
    queryFn: () => {
      return axios.post(
        'https://sketch-talk.com/',
        {
          diaryId: diaryId,
          image_url: image_url,
        },
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
}

export const useDiaryEditFetch = useMutation({
  mutationFn: ({diaryId, date, title, emotion, content}) => {
    const token = ls('token');
    return axios.put(
      'https://sketch-talk.com/',
      {
        diaryId: diaryId,
        date: date,
        title: title,
        emotion: emotion,
        content: content,
      },
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

export function useDiaryRedrawImageFetch(content, style, prevImage) {
  const token = ls('token');
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
}
