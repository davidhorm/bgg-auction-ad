import { GeekListItem } from "./geeklist.service";

const buildImageGalleryTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden' || imageSize === 'table-geeklist' || imageSize === 'table-forum') {
    return '';
  }

  const imageTags = geekListItems.map(item => `[imageid=${item.imageid} ${imageSize} inline]`);
  return imageTags.join('');
};

const buildColumn = (header: string, content: string): string => `[floatleft][u][b]${header}[/b][/u]\r\n${content}[/floatleft]`;

const buildBoxArtColumn = (geekListItems: GeekListItem[], imageSize: string): string => {
  const hasBoxArt = imageSize.startsWith('table-');
  if (hasBoxArt) {
    const content = geekListItems.map(item => `[imageid=${item.imageid} square]`).join('');
    return buildColumn('Box Art', content);  
  }
  
  return '';
};

/**
 * Need to add extra line breaks if Box Art is in the table. Also different line break formatting is needed depending on if text is posted in a GeekList or Forum.
 */
const formatCellWithLineBreaks = (imageSize: string, content: string): string => {
  switch (imageSize) {
    case 'table-geeklist':
      return ['[size=13][/size]', content, '[size=13][/size]'].join('\r\n'); // Need to add empty 26px line-height spaces around 24px text to be close to 75px square image.
    case 'table-forum':
      return ['', content, ''].join('\r\n'); // Default size=12 font has 25.2px line-height which ~75px.
    default:
      return content; // No line breaks needed when no Box Art in the table.
  }
};

const buildGameColumn = (geekListItems: GeekListItem[], imageSize: string): string => {
  const content = geekListItems.map(item => formatCellWithLineBreaks(imageSize, `[thing=${item.objectid}][/thing]`)).join('\r\n');
  return buildColumn('Game (BGG Link)', content);
};

const buildAuctionLinkColumn = (geekListItems: GeekListItem[], imageSize: string): string => {
  const content = geekListItems.map(item => formatCellWithLineBreaks(imageSize, `[listitem=${item.id}]Auction[/listitem]`)).join('\r\n');
  return buildColumn('Auction', content);
};

const buildAuctionValueColumn = (geekListItems: GeekListItem[], imageSize: string, propertyName: 'startingBid' | 'softReserve' | 'buyItNow', columnHeader: string): string => {
  const hasPropertyName = geekListItems.filter(item => item[propertyName]).length > 0;
  
  if (hasPropertyName) {
    const emptyAuctionValue = '-';
    const content = geekListItems.map(item => formatCellWithLineBreaks(imageSize, item[propertyName] || emptyAuctionValue)).join('\r\n');
    return buildColumn(columnHeader, content);
  }

  return '';
};

const buildStartingBidColumn = (geekListItems: GeekListItem[], imageSize: string): string =>
  buildAuctionValueColumn(geekListItems, imageSize, 'startingBid', 'SB');

const buildSoftReserveColumn = (geekListItems: GeekListItem[], imageSize: string): string => 
  buildAuctionValueColumn(geekListItems, imageSize, 'softReserve', 'SR');

const buildBuyItNowColumn = (geekListItems: GeekListItem[], imageSize: string): string => 
  buildAuctionValueColumn(geekListItems, imageSize, 'buyItNow', 'BIN');

const buildGameListTable = (geekListItems: GeekListItem[], imageSize: string): string => {
  const tableColumns = [
    buildBoxArtColumn(geekListItems, imageSize),
    buildGameColumn(geekListItems, imageSize),
    buildAuctionLinkColumn(geekListItems, imageSize),
    buildStartingBidColumn(geekListItems, imageSize),
    buildSoftReserveColumn(geekListItems, imageSize),
    buildBuyItNowColumn(geekListItems, imageSize),
  ];

  return `[size=12][floatleft]${tableColumns.join('')}[/floatleft][/size][clear]`;
};

export const generateText = (geeklistId: string, geekListItems: GeekListItem[], imageSize: string) => {
  const listSortedByName = geekListItems.sort((a, b) => a.objectname.localeCompare(b.objectname));

  const generatedText: string[] = [
    `Auction Link: [b][geeklist=${geeklistId}][/geeklist][/b]`,
    buildImageGalleryTags(listSortedByName, imageSize),
    buildGameListTable(listSortedByName, imageSize),
    `[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
};