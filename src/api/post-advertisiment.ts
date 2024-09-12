import { APIRoute } from './const';
import { AdvertisementNew } from '../models';

export async function postAdvertisement(data: AdvertisementNew): Promise<AdvertisementNew | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  const response = await fetch(`${apiUrl.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Failed to put advertisement`);
  }
  return;
}