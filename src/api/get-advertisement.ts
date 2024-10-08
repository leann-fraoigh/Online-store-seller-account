import { APIRoute } from './const';
import { Advertisement } from '../models';

export async function getAdvertisement(id: string, signal?: AbortSignal): Promise<Advertisement | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  const response = await fetch(`${apiUrl.toString()}/${id}`, { signal });

  try {
    if (!response.ok) {
      // return rejectWithValueHandler(responseJson);
      throw new Error(`Failed to fetch advertisement with id: ${id}`);
    }
    // TODO: Проверить ипизацию
    const responseJson = await response.json() as Advertisement;
    return responseJson;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log(`Fetch aborted for advertisement with id: ${id}`);
    } else {
      console.error(`Error fetching advertisement with id: ${id}:`, error);
    }
    return;
  }
}

