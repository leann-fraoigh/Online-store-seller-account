import { APIRoute } from './const';
import { AdvertisementPatch } from '../models';

export async function patchAdvertisement(data: AdvertisementPatch, id: string): Promise<AdvertisementPatch | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  const response = await fetch(`${apiUrl.toString()}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Failed to patch advertisement`);
  }
  return;
}