import { client } from './client';

async function get(id?: number) {
  const { data } = await client.get<any>(id ? `/v1/blockchain/block/${id}` : '/v1/blockchain/block');
  return data;
}

export const block = {
  get
};
