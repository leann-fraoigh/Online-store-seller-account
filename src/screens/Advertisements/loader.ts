import { LoaderFunctionArgs   } from "react-router-dom";
import { getAdvertisementsByRange } from "../../api/get-advertisements-by-range";
import { AdvertisementList } from '../../models';

export interface loaderData {
  items: AdvertisementList,
  page: number,
  limit: number,
  pagesCount: number,
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("_page") ?? '1', 10);
  const limit = parseInt(url.searchParams.get("_per_page") ?? '10', 10);

  const response = await getAdvertisementsByRange(page, limit);
  
  if (response ) {
    console.log(response.data);
    return { items: response.data, page, limit, pagesCount: response.pages };
  }
}
