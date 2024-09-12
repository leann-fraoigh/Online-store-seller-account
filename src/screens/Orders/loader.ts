import { getOrders } from "../../api/get-orders";
import { OrdersList } from '../../models';

export interface loaderData {
  items: OrdersList,
}

export async function loader() {
  const response = await getOrders();

  return { items: response };
}
