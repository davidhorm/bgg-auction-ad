import { parseStringPromise } from 'xml2js';

export const fetchGeekListXml = async (geeklistId: number) => {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const url = `${corsProxy}https://www.boardgamegeek.com/xmlapi/geeklist/${geeklistId}`;
  const response = await fetch(url)
    .then(async (response: Response) => await response.text())
    .catch(error => {
      console.error(error);
      return `An error occurred trying to get the GeekList with id: ${geeklistId}`;
    });
  
  return response;
};

export const convertXmlToJson = async (xml: string) =>
  await parseStringPromise(xml)
    .then(result => {
      return result;
    })
    .catch(error => {
      console.error({error});
      return error;
    });