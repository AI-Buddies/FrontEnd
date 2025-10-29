import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

type Todo = {
  dialog: string;
};

export const useDiaryChatFetch = (dialog: string) => {
  return useQuery({
    queryKey: [dialog],
    queryFn: () => {
      return axios.get<Todo>('about:blank');
    },
    staleTime: 1000,
  });
};
