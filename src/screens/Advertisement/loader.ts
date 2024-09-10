import { LoaderFunctionArgs   } from "react-router-dom";
import { getAdvertisement } from "../../api/get-advertisement";
import { Advertisement } from '../../models';

export type loaderData = {
  item: Advertisement,
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = parseInt(params.advertisementId?.slice(1) || '1', 10);

  const response = await getAdvertisement(id);

  // TODO: Обработать ошибку загрузки
  if (response) {
    return { item: response };
  }
}