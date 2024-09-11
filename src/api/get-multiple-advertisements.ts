import { getAdvertisement } from "./get-advertisement";
import { Advertisement } from '../models';

export async function getMultipleAdvertisements(ids: string[], signal: AbortSignal): Promise<(Advertisement)[]> {
  try {
    const fetchPromises = ids.map(id => getAdvertisement(id, signal));
    const results = await Promise.all(fetchPromises);
    const filteredResults: Advertisement[] = results.filter((result): result is Advertisement => result !== undefined);
    return filteredResults;
  } catch (error) {
    console.error("Error fetching multiple advertisements:", error);
    return [];
  }  
}