import { LoaderFunctionArgs   } from "react-router-dom";
import { getAdvertisement } from "../../api/get-advertisement";
import { Advertisement } from '../../models';

export interface loaderData {
  item: Advertisement,
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.advertisementId?.slice(1) ?? '1';

  const response = await getAdvertisement(id);

  // TODO: Обработать ошибку загрузки
  if (response) {
    return { item: response };
  }
}