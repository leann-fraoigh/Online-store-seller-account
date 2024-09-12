// Типы
import { AdvertisementList } from '../models';
// Компоненты
import AdList from './AdList';
// UI
import {Box, Modal, CircularProgress, Typography } from '@mui/material';

interface Props {
  advertisements: AdvertisementList;
  onClose: () => void;
  isOpen: boolean;
  isLoading: boolean;
}

const style = {
  position: 'absolute' as const,
  display: 'flex',
  flexWrap: 'wrap',
  top: '50%',
  left: '50%',
  width: '80%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function OrderModal(props: Props) {
  const { advertisements, onClose, isOpen, isLoading } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ style }>
        {isLoading ? (
            <CircularProgress sx={{ marginLeft:'auto', marginRight:'auto' }}/>
          ) : (
            <>
              <Typography gutterBottom variant="h5" component="p" sx={{ width: '100%', mb: 1.5 }}>Товары, входящие в этот заказ</Typography> 
              <AdList advertisements={advertisements}/>        
            </>
          )
        }  
      </Box>
    </Modal>
  );
}