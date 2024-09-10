import { useLoaderData } from "react-router-dom";
import { loaderData } from "./loader";
import { useState, useEffect, useCallback } from "react";
// Хелперы
import { throttle } from "../../helpers/trorrle";
// Типы
import { OrderStatus, Order, OrderStatusKeyType } from "../../models";
// Компоненты
import OrderList from "../../components/OrdersList";
// UI
import { Typography, FormGroup, FormControlLabel, Checkbox, FormControl, Box, FormLabel, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

type SortOrder = 'ascending' | 'descending';

export default function Orders() {
  // TODO: Во всем компоненте напрашивается лучшая типизация по статусам.
  const { items } = useLoaderData() as loaderData;

  const [sort, setSort] = useState<SortOrder>('descending');

  const [selectAll, setSelectAll] = useState(true);

  const [filter, setFilter] = useState<Record<OrderStatusKeyType, boolean>>({
    Created: true,
    Paid: true,
    Transport: true,
    DeliveredToThePoint: true,
    Received: true,
    Archived: true,
    Refund: true,
  });

  const throttledSetState = useCallback(
    throttle((newState: any) => {
      setFilter(newState);
    }, 300),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...filter,
      [event.target.name]: event.target.checked,
    };
    throttledSetState(newState);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as SortOrder);
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const newState: Record<OrderStatusKeyType, boolean> = {
      Created: checked,
      Paid: checked,
      Transport: checked,
      DeliveredToThePoint: checked,
      Received: checked,
      Archived: checked,
      Refund: checked,
    };
    throttledSetState(newState);
  };

  useEffect(() => {
    const allChecked = Object.values(filter).every(Boolean);
    setSelectAll(allChecked);
  }, [filter]);

  const filterFunction = (item: Order) => {
    const status = item.status;
    const orderStatusKeys = Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>;
    const statusKey = orderStatusKeys.find(key => OrderStatus[key] === status);
    if (statusKey) {
      return filter[statusKey];
    }
    return false;
  };

  const sortFunction = (a: Order, b: Order) => {
    if (sort === 'descending') {
      return a.total - b.total;
    } else {
      return b.total - a.total;
    }
  };

  const filteredAndSortedItems = items.filter(filterFunction).sort(sortFunction);

  const { Created, Paid, Transport, DeliveredToThePoint, Received, Archived, Refund } = filter;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection:'column' }}>
        <FormControl variant="standard" sx={{ m: 1, mb: 1, maxWidth: 175 }} size="small" >
          <InputLabel id="demo-select-small-label">Сортировать по сумме заказа</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sort}
            label="price"
            onChange={handleSortChange}
          > 
            <MenuItem value={'ascending'}>По возрастанию</MenuItem>
            <MenuItem value={'descending'}>По убыванию</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 3, ml:0 }} component="fieldset" variant="standard" >
          <FormLabel component="legend">Показывать только заказы в статусе:</FormLabel>
          <FormGroup row>
            {/* TODO: Это бы как-то генерировать из списка статусов, но пока не вышло из-за сложностей с типами */}
            <FormControlLabel
              control={
                <Checkbox checked={selectAll} onChange={handleSelectAllChange} name="selectAll" />
              }
              label="Выбрать все"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Created} onChange={handleFilterChange} name="Created" />
              }
              label="Создан"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Paid} onChange={handleFilterChange} name="Paid" />
              }
              label="Оплачен"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Transport} onChange={handleFilterChange} name="Transport" />
              }
              label="В пути"
            />
            <FormControlLabel
              control={
                <Checkbox checked={DeliveredToThePoint} onChange={handleFilterChange} name="DeliveredToThePoint" />
              }
              label="Доставлен в пункт"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Received} onChange={handleFilterChange} name="Received" />
              }
              label="Получен"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Archived} onChange={handleFilterChange} name="Archived" />
              }
              label="Архивирован"
            />
            <FormControlLabel
              control={
                <Checkbox checked={Refund} onChange={handleFilterChange} name="Refund" />
              }
              label="Возврат"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Typography gutterBottom variant="h5" component="h2">Мои заказы</Typography>      
      <OrderList orders={filteredAndSortedItems} />
    </>
  )
}
