// Типы
import { AdvertisementList } from '../models';
// Компоненты
import AdCard from './AdCard';
// UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

interface Props {
  advertisements: AdvertisementList;
}

export default function AdList(props: Props) {
  const { advertisements } = props;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
        {advertisements.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AdCard advertisement={item} />
          </Grid>
        ))}
        </Grid>
      </Box>
    </>
  );
}
