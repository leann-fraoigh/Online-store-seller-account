// UI
import { Pagination as PaginationElement, Stack } from '@mui/material';

interface Props {
  pagesCount: number,
  currentPage: number,
  onChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

export default function Pagination(props: Props) {
  const {pagesCount, currentPage, onChange} = props;
  return (
    <Stack spacing={2} sx={{mt: 3}}>
      <PaginationElement count={pagesCount} page={currentPage} color="primary" onChange={onChange} />
    </Stack>
  )
}
