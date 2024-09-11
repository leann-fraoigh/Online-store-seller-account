import { formatDate } from '../helpers/format-date';

// Типы
import { Order } from '../models';

// UI
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CurrencyRuble, Check, CalendarMonth } from '@mui/icons-material';

const statusMap = {
  0: 'Создан',
  1: 'Оплачен',
  2: 'В пути',
  3: 'Доставлен в пункт',
  4: 'Получен',
  5: 'Архивирован',
  6: 'Возврат'
};

const translatedStatuses = Object.values(statusMap);

interface Props {
  order: Order;
  onClick: (ads: number[]) => void;
}

export default function OrderCard(props: Props) {
  const {id, status, createdAt, finishedAt, items, total} = props.order;

  const sumItems = items.reduce(
    (acc, value) => acc + value.count,
    0,
  );

  const getAdvertisementsId = items.reduce((acc: number[], value) => {
    acc.push(parseInt(value.id, 10));
    return acc;
  }, [] as number[]);


  return (
    <Card variant="outlined" sx={{ borderColor: finishedAt ? 'green' : '', minHeight:250, display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }} display={'flex'} justifyContent={'space-between'}>

          {/* Номер заказа */}
          <span className='sr-only'>Номер заказа</span>№{id}

          {/* Дата создания */}
          <span><CalendarMonth fontSize='inherit' sx={{ mb: -0.25}} /> <span className='sr-only'>Дата создания</span>{formatDate(createdAt)}</span>
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
        <Button size="small" onClick={() => {props.onClick(getAdvertisementsId)}}>Показать все товары</Button>
      </CardActions>
    </Card>
  );
}
