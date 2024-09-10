import { APIRoute } from './const';
import { AdvertisementList } from '../models';

export async function getAdvertisements(start?: number, limit?: number): Promise<AdvertisementList | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  if (start !== undefined && limit !== undefined) {
    apiUrl.searchParams.set('_start', start.toString());
    apiUrl.searchParams.set('_limit', limit.toString());
  }
  const response = await fetch(apiUrl);

  const responseJson = await response.json();
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}