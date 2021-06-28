import { client } from './client';

async function list(id?: number) {
  const { data } = await client.get<any>(id ? `/v1/accounts/${id}` : '/v1/accounts');
  return data;
}

export const account = {
  list
};
