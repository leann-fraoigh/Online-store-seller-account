import { APIRoute } from './const';
import { OrdersList } from '../models';

export async function getOrders(): Promise<OrdersList | void> {
  const apiUrl = new URL(APIRoute.Orders);
  const response = await fetch(apiUrl);

  const responseJson = await response.json();
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}