import { APIRoute } from './const';
import { AdvertisementList } from '../models';

interface ApiResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: AdvertisementList;
}

export async function getAdvertisementsByRange(page?: number, limit?: number, name?: string): Promise<ApiResponse | void> {
  const apiUrl = new URL(`${APIRoute.Advertisement}`);
  if (page && limit) {
    apiUrl.searchParams.set('_page', page.toString());
    apiUrl.searchParams.set('_per_page', limit.toString());
  }
  if (name && name.length > 0) {
    apiUrl.searchParams.set('name', name);
  }
  const response = await fetch(apiUrl);
  const responseJson = await response.json() as ApiResponse;
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}