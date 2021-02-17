import { GeekListItem } from "./geeklist.service";

type BggTableRowFormat = {
  boxArtCell: string;
  gameNameCell: string;
  auctionLinkCell: string;
  startingBidCell: string;
  softReserveCell: string;
  buyItNowCell: string;
};

type BggTableFormat = {
  hasBoxArtColumn: boolean;
  hasStartingBidColumn: boolean;
  hasSoftReserveColumn: boolean;
  hasBuyItNowColumn: boolean;
  tableRows: BggTableRowFormat[];
};

/**
 * When imageId === '0', then replace with transparent box art instead.
 * 
 * This happened with GeekList ID 281572
 * 
 * @param imageId 
 */
const buildBoxArtCell = (imageId: string): string => {
  const transparentBoxArt = '[imageid=5987513 square]';
  return imageId !== '0' ? `[imageid=${imageId} square]` : transparentBoxArt;
};

const buildGameNameCell = (objectId: string): string => `[thing=${objectId}][/thing]`; // TODO: line break objectname if too long
const buildAuctionLinkCell = (geekListItemId: string): string => `[listitem=${geekListItemId}]Auction[/listitem]`;

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

const transformToBggTableFormat = (geekListItems: GeekListItem[], imageSize: string): BggTableFormat => {
  const hasBoxArtColumn = imageSize.startsWith('table-');
  const hasStartingBidColumn = geekListItems.filter(item => item.startingBid).length > 0;
  const hasSoftReserveColumn = geekListItems.filter(item => item.softReserve).length > 0;
  const hasBuyItNowColumn = geekListItems.filter(item => item.buyItNow).length > 0;

  const defaultAuctionValue = '-';

  const sortByGameName = (a: GeekListItem, b: GeekListItem) => a.objectname.localeCompare(b.objectname);

  const tableRows = geekListItems
    .sort(sortByGameName)
    .map(item => ({
      boxArtCell: hasBoxArtColumn ? buildBoxArtCell(item.imageid) : '',
      gameNameCell: formatCellWithLineBreaks(imageSize, buildGameNameCell(item.objectid)),
      auctionLinkCell: formatCellWithLineBreaks(imageSize, buildAuctionLinkCell(item.id)),
      startingBidCell: hasStartingBidColumn ? formatCellWithLineBreaks(imageSize, item.startingBid || defaultAuctionValue) : '',
      softReserveCell: hasSoftReserveColumn ? formatCellWithLineBreaks(imageSize, item.softReserve || defaultAuctionValue) : '',
      buyItNowCell: hasBuyItNowColumn ? formatCellWithLineBreaks(imageSize, item.buyItNow || defaultAuctionValue) : '',
    }));

  return {
    hasBoxArtColumn,
    hasStartingBidColumn,
    hasSoftReserveColumn,
    hasBuyItNowColumn,
    tableRows,
  };
};

const buildImageGalleryTags = (geekListItems: GeekListItem[], imageSize: string) => {
  if (imageSize === 'hidden' || imageSize === 'table-geeklist' || imageSize === 'table-forum') {
    return '';
  }

  const imageTags = geekListItems.map(item => item.imageid !== '0' ? `[imageid=${item.imageid} ${imageSize} inline]` : '');
  return imageTags.join('');
};

const buildColumn = (header: string, content: string): string => `[floatleft][u][b]${header}[/b][/u]\r\n${content}[/floatleft]`;

const buildGameListTable = (bggTableFormat: BggTableFormat): string => {
  const tableColumns = [
    bggTableFormat.hasBoxArtColumn ? buildColumn('Box Art', bggTableFormat.tableRows.map(row => row.boxArtCell).join('')) : '',
    buildColumn('Game (BGG Link)', bggTableFormat.tableRows.map(row => row.gameNameCell).join('\r\n')),
    buildColumn('Auction', bggTableFormat.tableRows.map(row => row.auctionLinkCell).join('\r\n')),
    bggTableFormat.hasStartingBidColumn ? buildColumn('SB', bggTableFormat.tableRows.map(row => row.startingBidCell).join('\r\n')) : '',
    bggTableFormat.hasSoftReserveColumn ? buildColumn('SR', bggTableFormat.tableRows.map(row => row.softReserveCell).join('\r\n')) : '',
    bggTableFormat.hasBuyItNowColumn ? buildColumn('BIN', bggTableFormat.tableRows.map(row => row.buyItNowCell).join('\r\n')) : '',
  ];

  return `[size=12][floatleft]${tableColumns.join('')}[/floatleft][/size][clear]`;
};

export const generateText = (geeklistId: string, geekListItems: GeekListItem[], imageSize: string) => {
  const listSortedByName = geekListItems.sort((a, b) => a.objectname.localeCompare(b.objectname));

  const bggTableFormat = transformToBggTableFormat(geekListItems, imageSize);

  const generatedText: string[] = [
    `Auction Link: [b][geeklist=${geeklistId}][/geeklist][/b]`,
    buildImageGalleryTags(listSortedByName, imageSize),
    buildGameListTable(bggTableFormat),
    `[b][COLOR=#009900]List Generated via [url=http://davidhorm.github.io/bgg-auction-ad]BGG Auction Ad[/url] tool (a free service)[/COLOR][/b]`
  ];

  return generatedText.filter(text => text).join('\r\n\r\n');
};