import { FetcherWithComponents } from 'react-router-dom';
// UI
import {Box, Modal, Typography, TextField, Button, Alert } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
// Типы
import { Advertisement } from '../models';

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
  data?: Advertisement;
  method: 'POST' | 'PATCH'
}

export default function AdModal(props: Props) {
  const { method, isOpen, onClose, fetcher, state } = props;
  const { name, description, imageUrl, price } = props.data ?? {};

  const text = {
    title: method === 'POST' ? 'Создание нового объявления' : 'Редактирование объявления',
    callToAction: method === 'POST' ? 'Опубликовать' : 'Отредактировать',
    successMessage: method === 'POST' ? 'Объявление опубликовано.' : 'Объявление отредактировано.', 
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="create-ad-modal-title"
    > 
      <fetcher.Form method={method} action='#' >
        <Box
          component="div"
          sx={ style }
        >
          <Typography id="create-ad-modal-title" gutterBottom variant="h5" component="h4" sx={{ width: '100%', mb: 0.5 }}>{text.title}</Typography>
          <TextField id="name" label="Название" variant="standard" name='name' defaultValue={name} required />
          {/* TODO: Авторы библиотеки предупреждают, что type="number может порождать баги (https://mui.com/material-ui/react-text-field/#type-quot-number-quot). Нужно будет заменить его или присматривать за ним. */}
          {/* TODO: Доделать валидацию для обязательных полей */}
          <TextField id="price" label="Цена" variant="standard" type="number" name='price' defaultValue={price} required />
          <TextField id="imageUrl" label="Фото (введите ссылку)" variant="standard" name='imageUrl'defaultValue={imageUrl} />
          <TextField
            id="description"
            label="Описание"
            multiline
            variant="standard"
            name="description"
            defaultValue={description}
            maxRows={15}
          />
          {state !== 'success' ? (
            <Button size="small" variant="contained" sx={{ width: 'auto', alignSelf: 'center', mt: 0.5 }} type='submit' disabled={state === 'submitting'} >{text.callToAction}</Button>
          ) : ( 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {text.successMessage}
            </Alert>
          )}
        </Box>
      </fetcher.Form>
    </Modal>
  );
}