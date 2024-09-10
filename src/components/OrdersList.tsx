// Типы
import { OrdersList } from '../models';
// Компоненты
import OrderCard from './OrderCard';
// UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

interface Props {
  orders: OrdersList;
}

export default function OrderList(props: Props) {
  const { orders } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
      {orders.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <OrderCard order={item} />
        </Grid>
      ))}
      </Grid>
    </Box>
  );
}
