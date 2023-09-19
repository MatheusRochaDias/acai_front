import { HandleError } from '~/error/HandlerError';
import { api } from '~/services/api';

export interface SignInRequestData {
  email: string;
  name: string;
  birth_date: Date;
  password: string;
  phone_number: string;
  first_access: boolean;
}

export async function updateUser(id: string, email: string, name: string) {
  try {
    const { data } = await api.put(`/users/${id}`, {
      email,
      name,
    });
    return data;
  } catch (error) {
    throw new HandleError(error);
  }
}
