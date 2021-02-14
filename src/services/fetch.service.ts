import { parseStringPromise } from 'xml2js';

/**
 * Fetch GeekList by GeekList ID.
 */
export const fetchGeekListJson = async (geeklistId: string) => {
  const corsProxy = 'https://bgg-auction-ad.davidhorm.workers.dev/';
  const bggGeeklistApi = `xmlapi/geeklist/${geeklistId}`;
  const url = `${corsProxy}${bggGeeklistApi}`;
  const response = await fetch(url)
    .then(async (response: Response) => await response.text())
    .then(async (xml: string) => await parseStringPromise(xml))
    .then(result => result)
    .catch(error => {
      console.error(error);
      return `An error occurred trying to get the GeekList with id: ${geeklistId}`;
    });
  
  return response;
};
