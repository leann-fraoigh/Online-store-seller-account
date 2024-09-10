import { LoaderFunctionArgs   } from "react-router-dom";
import { getAdvertisements } from "../../api/get-advertisements";
import { AdvertisementList } from '../../models';

export type loaderData = {
  items: AdvertisementList,
  page: number,
  limit: number,
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || '1', 10);
  const limit = parseInt(url.searchParams.get("limit") || '10', 10);
  const start = (page - 1) * limit;

  const response = await getAdvertisements(start, limit);

  return { items: response, page, limit };
}
