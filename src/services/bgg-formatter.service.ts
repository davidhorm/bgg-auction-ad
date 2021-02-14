import { GeekListItem } from "./geeklist.service";

const buildImageGalleryTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden' || imageSize === 'table') {
    return '';
  }

  const imageTags = geekListItems.map(item => `[imageid=${item.imageid} ${imageSize} inline]`);
  return imageTags.join('');
};

const buildColumn = (header: string, content: string): string => `[floatleft][u][b]${header}[/b][/u]\r\n${content}[/floatleft]`;

const buildBoxArtColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  if (hasBoxArt) {
    const content = geekListItems.map(item => `[imageid=${item.imageid} square]`).join('');
    return buildColumn('Box Art', content);  
  }
  
  return '';
};

const buildGameColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  const boxArtLineBreaks = hasBoxArt ? '\r\n' : '';
  const content = geekListItems.map(item => `${boxArtLineBreaks}[thing=${item.objectid}][/thing]${boxArtLineBreaks}`).join('\r\n');
  return buildColumn('Game (BGG Link)', content);
};

const buildAuctionLinkColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  const boxArtLineBreaks = hasBoxArt ? '\r\n' : '';
  const content = geekListItems.map(item => `${boxArtLineBreaks}[listitem=${item.id}]Auction[/listitem]${boxArtLineBreaks}`).join('\r\n');
  return buildColumn('Auction', content);
};

const emptyAuctionValue = '-';

const buildStartingBidColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  const boxArtLineBreaks = hasBoxArt ? '\r\n' : '';
  const hasStartingBids = geekListItems.filter(item => item.startingBid).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => `${boxArtLineBreaks}${item.startingBid || emptyAuctionValue}${boxArtLineBreaks}`).join('\r\n');
    return buildColumn('SB', content);
  }

  return '';
};

const buildSoftReserveColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  const boxArtLineBreaks = hasBoxArt ? '\r\n' : '';
  const hasStartingBids = geekListItems.filter(item => item.softReserve).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => `${boxArtLineBreaks}${item.softReserve || emptyAuctionValue}${boxArtLineBreaks}`).join('\r\n');
    return buildColumn('SR', content);
  }

  return '';
};

const buildBuyItNowColumn = (geekListItems: GeekListItem[], hasBoxArt: boolean): string => {
  const boxArtLineBreaks = hasBoxArt ? '\r\n' : '';
  const hasStartingBids = geekListItems.filter(item => item.buyItNow).length > 0;
  
  if (hasStartingBids) {
    const content = geekListItems.map(item => `${boxArtLineBreaks}${item.buyItNow || emptyAuctionValue}${boxArtLineBreaks}`).join('\r\n');
    return buildColumn('BIN', content);
  }

  return '';
};

const buildGameListTable = (geekListItems: GeekListItem[], imageSize: string): string => {
  const hasBoxArt = imageSize === 'table';

  const tableColumns = [
    buildBoxArtColumn(geekListItems, hasBoxArt),
    buildGameColumn(geekListItems, hasBoxArt),
    buildAuctionLinkColumn(geekListItems, hasBoxArt),
    buildStartingBidColumn(geekListItems, hasBoxArt),
    buildSoftReserveColumn(geekListItems, hasBoxArt),
    buildBuyItNowColumn(geekListItems, hasBoxArt),
  ];

  return `[size=12][floatleft]${tableColumns.join('')}[/floatleft][/size][clear]`;
};

export const generateText = (geeklistId: string, geekListItems: GeekListItem[], imageSize: string) => {
  const generatedText: string[] = [
    `Auction Link: [b][geeklist=${geeklistId}][/geeklist][/b]`,
    buildImageGalleryTags(geekListItems, imageSize),
    buildGameListTable(geekListItems, imageSize),
    `[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
};