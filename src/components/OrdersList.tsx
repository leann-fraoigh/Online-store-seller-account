import { useState } from 'react';
import { getMultipleAdvertisements } from '../api/get-multiple-advertisements';
// Типы
import { Advertisement, OrdersList } from '../models';
// Компоненты
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
// UI
import {Box, Grid2 as Grid } from '@mui/material';

interface Props {
  orders: OrdersList;
}

export default function OrderList(props: Props) {
  const { orders } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [advertisementsData, setAdvertisementsData] = useState<Advertisement[]>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleModalOpen = async (ads: string[]) => {
    setModalOpen(true);
    setLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    await getMultipleAdvertisements(ads, controller.signal)
      .then((data) => {
        setAdvertisementsData(data);
      })
      .catch((error: Error) => {
        if (error.name !== 'AbortError') {
          console.error('Error fetching product data:', error);
        }
      })
      .finally (() => {
        setLoading(false);
      }  
    )
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
    if (abortController) {
      abortController.abort();
    }
    setAdvertisementsData([]);
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
        {orders.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <OrderCard order={item} onClick={handleModalOpen} />
          </Grid>
        ))}
        </Grid>
      </Box>
      <OrderModal onClose={handleModalClose} isOpen={modalOpen} advertisements={advertisementsData} isLoading={loading} />
    </>
  );
}
