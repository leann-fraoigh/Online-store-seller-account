import { APIRoute } from './const';
import { Advertisement } from '../models';

export async function getAdvertisement(id: number, signal?: AbortSignal): Promise<Advertisement | void> {
  const apiUrl = new URL(APIRoute.Advertisement);
  const response = await fetch(`${apiUrl}/${id}`, { signal });

  try {
    if (!response.ok) {
      // return rejectWithValueHandler(responseJson);
      throw new Error(`Failed to fetch advertisement with id: ${id}`);
    }
    const responseJson = await response.json();
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

