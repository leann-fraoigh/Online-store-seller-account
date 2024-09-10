import { useLoaderData } from "react-router-dom";
import { loaderData } from "./loader";
// Компоненты
import OrderList from "../../components/OrdersList";
// UI
import { Typography } from '@mui/material';

export default function Orders() {
  const { items } = useLoaderData() as loaderData;

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">Мои заказы</Typography>
      <OrderList orders={items} />
    </>
  )
}
