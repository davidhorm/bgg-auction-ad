import { GeekListItem } from "./geeklist.service";

const buildImageGalleryTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden' || imageSize === 'table') {
    return '';
  }

  const imageTags = geekListItems.map(item => `[imageid=${item.imageid} ${imageSize} inline]`);
  return imageTags.join('');
};

const buildColumn = (header: string, content: string): string => `[floatleft][u][b]${header}[/b][/u]\r\n${content}[/floatleft]`;

const buildGameColumn = (geekListItems: GeekListItem[]): string => {
  const content = geekListItems.map(item => `[thing=${item.objectid}][/thing]`).join('\r\n');
  return buildColumn('Game (BGG Link)', content);
};

const buildAuctionLinkColumn = (geekListItems: GeekListItem[]): string => {
  const content = geekListItems.map(item => `[listitem=${item.id}]Auction[/listitem]`).join('\r\n');
  return buildColumn('Auction', content);
};

const emptyAuctionValue = '-';

const buildStartingBidColumn = (geekListItems: GeekListItem[]): string => {
  const hasStartingBids = geekListItems.filter(item => item.startingBid).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => item.startingBid || emptyAuctionValue).join('\r\n');
    return buildColumn('SB', content);
  }

  return '';
};

const buildSoftReserveColumn = (geekListItems: GeekListItem[]): string => {
  const hasStartingBids = geekListItems.filter(item => item.softReserve).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => item.softReserve || emptyAuctionValue).join('\r\n');
    return buildColumn('SR', content);
  }

  return '';
};

const buildBuyItNowColumn = (geekListItems: GeekListItem[]): string => {
  const hasStartingBids = geekListItems.filter(item => item.buyItNow).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => item.buyItNow || emptyAuctionValue).join('\r\n');
    return buildColumn('BIN', content);
  }

  return '';
};

const buildGameListTable = (geekListItems: GeekListItem[]): string => {
  const tableColumns = [
    buildGameColumn(geekListItems),
    buildAuctionLinkColumn(geekListItems),
    buildStartingBidColumn(geekListItems),
    buildSoftReserveColumn(geekListItems),
    buildBuyItNowColumn(geekListItems),
  ];

  return `[size=12][floatleft]${tableColumns.join('')}[/floatleft][/size][clear]`;
};

export const generateText = (geeklistId: string, geekListItems: GeekListItem[], imageSize: string) => {
  const generatedText: string[] = [
    `Auction Link: [b][geeklist=${geeklistId}][/geeklist][/b]`,
    buildImageGalleryTags(geekListItems, imageSize),
    buildGameListTable(geekListItems),
    `[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
};