import { FetcherWithComponents } from 'react-router-dom';
// UI
import {Box, Modal, Typography, TextField, Button, Alert } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  width: '90%',
  maxWidth: '600px',
  gap: 2.5,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  onClose: () => void;
  isOpen: boolean;
  fetcher: FetcherWithComponents<never>;
  state: 'success' | 'initial' | 'submitting';
}

export default function AdCreateModal(props: Props) {
  const { isOpen, onClose, fetcher, state } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="create-ad-modal-title"
    > 
      <fetcher.Form method='PUT' action='#' >
        <Box
          component="div"
          sx={ style }
        >
          <Typography id="create-ad-modal-title" gutterBottom variant="h5" component="h4" sx={{ width: '100%', mb: 0.5 }}>Создание нового объявления</Typography>
          <TextField id="name" label="Название" variant="standard" name='name' required />
          {/* TODO: Авторы библиотеки предупреждают, что type="number может порождать баги (https://mui.com/material-ui/react-text-field/#type-quot-number-quot). Нужно будет заменить его или присматривать за ним. */}
          {/* TODO: Доделать валидацию для обязательных полей */}
          <TextField id="price" label="Цена" variant="standard" type="number" name='price' required />
          <TextField id="imageUrl" label="Фото (введите ссылку)" variant="standard" name='imageUrl'/>
          <TextField
            id="description"
            label="Описание"
            multiline
            rows={1}
            variant="standard"
            name="description"
          />
          {state !== 'success' ? (
            <Button size="small" variant="contained" sx={{ width: 'auto', alignSelf: 'center', mt: 0.5 }} type='submit' disabled={state === 'submitting'} >Опубликовать</Button>
          ) : ( 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Объявление опубликовано.
            </Alert>
          )}
        </Box>
      </fetcher.Form>
    </Modal>
  );
}