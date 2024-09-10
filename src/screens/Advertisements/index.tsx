import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { loaderData } from "./loader";
// Компоненты
import AdList from "../../components/AdList";
import Pagination  from "../../components/Pagination";
// UI
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Typography } from '@mui/material';

export default function Advertisements() {
  // TODO: Убрать хардкод, см. комментарий в README.
  const PAGES_COUNT = 10;

  const { items, page: initialPage, limit: initialLimit } = useLoaderData() as loaderData;
  const [limit, setLimit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [_, setSearchParams] = useSearchParams();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), limit: limit.toString() });
  }, [limit, currentPage])

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">Мои объявления</Typography>
      <FormControl variant="standard" sx={{ m: 1, mb: 3, minWidth: 200 }} size="small" >
        <InputLabel id="demo-select-small-label">Объявлений на странице</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={limit.toString()}
          label="number"
          onChange={handleLimitChange}
        > 
          {/* TODO: Эти данные можно вынести куда-то, чтобы из них формировать список опций, и чтобы оттуда же бралось дефолтное число для лоадера, чтобы оно точно совпадало с одной из опций */}
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <AdList advertisements={items} />
      <Pagination currentPage={currentPage} pagesCount={PAGES_COUNT} onChange={handlePageChange}/>
    </>
  )
}
