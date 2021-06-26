import { client } from './client';

export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  token: string | null;
  refreshToken: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface UserCreateRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

export const initialUserState: User = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  token: null,
  refreshToken: null,
  createdAt: null,
  updatedAt: null,
};

async function create(user: UserCreateRequest) {
  const { data } = await client.post<User>('/v1/users', user);
  return data;
}

async function retrieve(id?: number) {
  const { data } = await client.get<User>(id ? `/v1/users/${id}` : '/v1/user');
  return data;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  newPassword?: string;
}

async function update(id: number, patch: UpdateUserRequest) {
  const { data } = await client.patch<User>(`/v1/users/${id}`, patch);
  return data;
}

export const user = {
  create,
  retrieve,
  update,
};
