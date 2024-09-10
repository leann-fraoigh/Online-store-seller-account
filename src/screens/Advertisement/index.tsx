import { useLoaderData   } from "react-router-dom";
import { loaderData } from "./loader";
// UI
import { Typography } from "@mui/material";
import { CurrencyRuble } from "@mui/icons-material";

export default function Advertisement() {
  const { item: { name, description, imageUrl, price } } = useLoaderData() as loaderData;
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
      <Typography gutterBottom variant="h6" component="p">
        <CurrencyRuble fontSize='inherit'/>{price}
      </Typography>
      {imageUrl  && <img src={imageUrl} style={{ height: "auto", width: "100%", maxWidth: "300" }} />}

      {description && (
        <Typography variant="body1" gutterBottom>{description}</Typography>
      )}
    </>
  )
}
