import { APIRoute } from './const';
import { AdvertisementList } from '../models';

export async function getAdvertisementsByRange(start?: number, limit?: number): Promise<AdvertisementList | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  if (start !== undefined && limit !== undefined) {
    apiUrl.searchParams.set('_start', start.toString());
    apiUrl.searchParams.set('_limit', limit.toString());
  }
  const response = await fetch(apiUrl);
  // TODO: Проверить типизацию
  const responseJson = await response.json() as AdvertisementList;
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}