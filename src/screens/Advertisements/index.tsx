import { useState, useEffect } from "react";
import { useLoaderData, useSearchParams, useFetcher } from "react-router-dom";
import { loaderData } from "./loader";
// Кастомные хуки
import { useModalWithFetcher } from "../../hooks/useModalWithFetcher";
// Компоненты
import AdList from "../../components/AdList";
import Pagination  from "../../components/Pagination";
import AdModal from "../../components/AdModal";
// UI
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Typography, Button, Box } from '@mui/material';

export default function Advertisements() {
  const { items, page, limit: initialLimit, pagesCount } = useLoaderData() as loaderData;
  const [limit, setLimit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(page);
  const setSearchParams = useSearchParams()[1];
  const fetcher = useFetcher();
  const { modalOpen, modalState, handleModalOpen, handleModalClose } = useModalWithFetcher(fetcher);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    setSearchParams({ _page: currentPage.toString(), _per_page: limit.toString() });
  }, [limit, currentPage, setSearchParams])

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 1.5, gap: 1.5 }} >
        <Typography variant="h5" component="h2">Мои объявления</Typography>
        <Button size="small" variant="outlined" onClick={handleModalOpen} >Создать новое объявление</Button>
      </Box>
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
      {/* Пагинация */}
      <Pagination currentPage={currentPage} pagesCount={pagesCount} onChange={handlePageChange}/>
      {/* Модалка */}
      <AdModal method="POST" isOpen={modalOpen} onClose={handleModalClose} fetcher={fetcher} state={modalState} />
    </>
  )
}
