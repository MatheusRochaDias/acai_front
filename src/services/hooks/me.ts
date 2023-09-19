import { useQuery } from 'react-query';
import { HandleError } from '~/error/HandlerError';
import { api } from '../api';

export async function getMe() {
  try {
    const { data } = await api.get(`/me`);
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}

export function useMe() {
  return useQuery(['categories'], () => getMe(), {
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
  });
}
