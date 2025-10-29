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

export const useDiaryInitialFetch = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return axios.get<Chat>('about:blank');
    },
    staleTime: 1000,
  });
};
