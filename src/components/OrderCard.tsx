import { formatDate } from '../helpers/format-date';

// Типы
import { Order } from '../models';

// UI
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CurrencyRuble, Check, CalendarMonth } from '@mui/icons-material';

const translatedStatuses = [
  'Создан',        // 0 - Created
  'Оплачен',       // 1 - Paid
  'В пути',        // 2 - Transport
  'Доставлен в пункт', // 3 - DeliveredToThePoint
  'Получен',       // 4 - Received
  'Архивирован',   // 5 - Archived
  'Возврат'        // 6 - Refund
];

interface Props {
  order: Order;
}

export default function OrderCard(props: Props) {
  const {id, status, createdAt, finishedAt, items, total} = props.order;

  const sumItems = items.reduce(
    (acc, value) => acc + value.count,
    0,
  );

  return (
    <Card variant="outlined" sx={{ borderColor: finishedAt ? 'green' : '', minHeight:250, display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }} display={'flex'} justifyContent={'space-between'}>

          {/* Номер заказа */}
          <span className='sr-only'>Номер заказа</span>№{id}

          {/* Дата создания */}
          <span><CalendarMonth fontSize='inherit' /> <span className='sr-only'>Дата создания</span>{formatDate(createdAt)}</span>
        </Typography>

        {/* Стоимость */}
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          <CurrencyRuble fontSize='inherit'/>{total}
        </Typography>

        {/* Статус */}
        <Typography variant="body2" sx={{ mb: 0 }}>
          Статус: {translatedStatuses[status]} 
        </Typography>

        {/* Число товаров в заказе */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          Товаров: {sumItems} 
        </Typography>

        {/* Завершен */}
        {finishedAt && (
          <Typography sx={{ color: 'text.secondary' }}>
            <Check fontSize='inherit' color='success'/>{'можно закрыть'}
          </Typography>
          )
        }
      </CardContent>
      <CardActions>
        <Button size="small">Показать все товары</Button>
      </CardActions>
    </Card>
  );
}
