import { LoaderFunctionArgs   } from "react-router-dom";
import { getAdvertisementsByRange } from "../../api/get-advertisements-by-range";
import { AdvertisementList } from '../../models';

export interface loaderData {
  items: AdvertisementList,
  page: number,
  limit: number,
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? '1', 10);
  const limit = parseInt(url.searchParams.get("limit") ?? '10', 10);
  const start = (page - 1) * limit;

  const response = await getAdvertisementsByRange(start, limit);

  return { items: response, page, limit };
}
