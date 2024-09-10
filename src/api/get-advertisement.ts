import { APIRoute } from './const';
import { Advertisement } from '../models';

export async function getAdvertisement(id: number): Promise<Advertisement | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  const response = await fetch(`${apiUrl}/${id}`);

  const responseJson = await response.json();
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}
