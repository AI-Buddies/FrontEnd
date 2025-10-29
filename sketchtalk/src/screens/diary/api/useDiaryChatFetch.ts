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

export const useDiaryChatFetch = (dialog: string) => {
  return useQuery({
    queryKey: [{dialog}],
    queryFn: () => {
      return axios.get<Chat>('about:blank');
    },
    staleTime: 1000,
  });
};
