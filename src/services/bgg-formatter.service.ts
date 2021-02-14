import { GeekListItem } from "./geeklist.service";

const buildImageGalleryTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden' || imageSize === 'table') {
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
    buildImageGalleryTags(geekListItems, imageSize),
    `[b]Index of Items[/b]`,
    buildGameListTags(geekListItems),
    `[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
};