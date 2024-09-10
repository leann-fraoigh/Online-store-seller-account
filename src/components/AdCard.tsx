import { Link } from 'react-router-dom';

// Типы
import { Advertisement } from '../models';

// UI
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Visibility, Favorite, CurrencyRuble } from '@mui/icons-material';
import { grey } from '@mui/material/colors';


interface Props {
  advertisement: Advertisement;
}

export default function AdCard(props: Props) {
  const {id, name, price, views, likes, imageUrl} = props.advertisement;

  const placeholderImage = '';
  const color = grey[300];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/advertisements/:${id}`}>
        {/* TODO: Здесь стоит подумать, нужен ли нормальный плейсхолдер на случай, если картинки нет */}
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || placeholderImage}
          alt={name}
          sx={{backgroundColor: color}}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <CurrencyRuble fontSize='inherit'/>{price}
          </Typography>
          <Typography variant="body2" gutterBottom display={'flex'} gap={1}>
            <span><Visibility fontSize='inherit'/><span className='sr-only'>Число просмотров</span> {views}</span> <span><Favorite fontSize='inherit'/><span className='sr-only'>Число лайков</span> {likes}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
