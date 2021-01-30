import { parseStringPromise } from 'xml2js';

export const fetchGeekListXml = async (geeklistId: string) => {
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

type GeekListItem = {
  id: string;
  imageid: string;
  objectid: string;
  objectname: string;
  objecttype: string;
  postdate: string;
  editdate: string;
  subtype: string;
  thumbs: string;
  username: string;
};

type GeekListJson = {
  geeklist: {
    item: {$: GeekListItem}[];
  };
};

export const buildSortedItems = (geekListJson: GeekListJson) => {
  const items: GeekListItem[] = geekListJson.geeklist.item.map(item => item.$);
  const sortedItems = items.sort((a, b) => a.objectname.localeCompare(b.objectname));
  return sortedItems;
}

const buildImageTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden') {
    return '';
  }

  const imageTags = geekListItems.map(item => `[imageid=${item.imageid} ${imageSize} inline]`);
  return imageTags.join('');
};

const buildGameListTags = (geekListItems: GeekListItem[]) => {
  const gameListTags = geekListItems.map(item => `[b]${item.objectname}[/b] - ([thing=${item.objectid}]BGG[/thing]) ([listitem=${item.id}]Auction[/listitem])`);
  return gameListTags.join('\r\n');
};

export const generateText = (geeklistId: string, geekListItems: GeekListItem[], imageSize: string) => {
  const generatedText: string[] = [
    `Auction Link: [b][geeklist=${geeklistId}][/geeklist][/b]`,
    buildImageTags(geekListItems, imageSize),
    `[b]Index of Items[/b]`,
    buildGameListTags(geekListItems),
    `[b][COLOR=#009900]List Generated via BGG Auction Ad tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
}