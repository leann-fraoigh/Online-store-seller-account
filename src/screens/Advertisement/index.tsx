import { useLoaderData, useFetcher } from "react-router-dom";
import { loaderData } from "./loader";
// Кастомные хуки
import { useModalWithFetcher } from "../../hooks/useModalWithFetcher";
// Компоненты
import AdModal from "../../components/AdModal";
// UI
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
import { CurrencyRuble as CurrencyRubleIcon, Edit as EditIcon } from "@mui/icons-material";

export default function Advertisement() {
  const { item } = useLoaderData() as loaderData;
  const fetcher = useFetcher();
  const { modalOpen, modalState, handleModalOpen, handleModalClose } = useModalWithFetcher(fetcher);

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', mb: 1.5, gap: 1.5 }} >
        <Typography variant="h5" component="h2">{item.name}</Typography>
        <Tooltip title="Редактировать объявление">
          <IconButton onClick={handleModalOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography gutterBottom variant="h6" component="p">
        <CurrencyRubleIcon fontSize='inherit'/>{item.price}
      </Typography>
      {item.imageUrl  && <img src={item.imageUrl} style={{ height: "auto", width: "100%", maxWidth: "300" }} />}

      {item.description && (
        <Typography variant="body1" gutterBottom>{item.description}</Typography>
      )}
      {/* Модалка */}
      <AdModal state={modalState} isOpen={modalOpen} fetcher={fetcher} data={item} method="PATCH" onClose={handleModalClose} />
    </>
  )
}
