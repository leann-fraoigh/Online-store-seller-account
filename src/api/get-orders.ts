import { APIRoute } from './const';
import { OrdersList } from '../models';

export async function getOrders(): Promise<OrdersList | void> {
  const apiUrl = new URL(APIRoute.Orders);
  const response = await fetch(apiUrl);

  // TODO: Проверить типизацию
  const responseJson = await response.json() as OrdersList;
  // if (!response.ok) {
  //   return rejectWithValueHandler(responseJson);
  // }
  return responseJson;
}