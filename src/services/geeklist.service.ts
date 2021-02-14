type GeekListItemAttr = {
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

type AuctionValues = {
  startingBid: string;
  softReserve: string;
  buyItNow: string;
};

export type GeekListItem = GeekListItemAttr & AuctionValues;

type GeekListJson = {
  geeklist: {
    item: {
      $: GeekListItemAttr;
      body: string[];
    }[];
  };
};

const formatGeekListItemBody = (body: string[]): string[] => {
  if (!body || !body[0]) {
    return [];
  }

  // Will match with: [b], [/b], [color=red], [color=#f6f6f6], [-], [/-]
  const bggFormattingRegex = /(\[\/?\w+(=#?\w+)?])|(\[\/?-])/gi;

  return body[0]
          .toLowerCase()
          .replaceAll(bggFormattingRegex, '')
          .split('\n')
          .filter(hasText => hasText.trim());
};

const getValueAfterSeparator = (foundText: string[]): string => {
  const semicolon_separator = ': ';
  if (foundText[0] && foundText[0].indexOf(semicolon_separator) >= 0) {
    return foundText[0].split(semicolon_separator)[1].trim();
  }

  const dash_separator = ' - ';
  if (foundText[0] && foundText[0].indexOf(dash_separator) >= 0) {
    return foundText[0].split(dash_separator)[1].trim();
  }

  return '';
};

const getStartingBid = (formattedGeekListItemBody: string[]): string => {
  const foundText = formattedGeekListItemBody.filter(text => text.match(/^((starting bid)|(sb)|(opening bid)|(min bid)|(minimum bid))/i));
  return getValueAfterSeparator(foundText);
};

const getSoftReserve = (formattedGeekListItemBody: string[]): string => {
  const foundText = formattedGeekListItemBody.filter(text => text.match(/^((soft reserve)|(sr)|(hard reserve))/i));
  return getValueAfterSeparator(foundText);
};

const getBuyItNow = (formattedGeekListItemBody: string[]): string => {
  const foundText = formattedGeekListItemBody.filter(text => text.match(/^((buy it now)|(bin))/i));
  return getValueAfterSeparator(foundText);
};

export const getGeekListItems = (geekListJson: GeekListJson) => {
  const items: GeekListItem[] = geekListJson.geeklist.item.map(item => {
    const formattedGeekListItemBody = formatGeekListItemBody(item.body);
    return {
      ...(item.$),
      startingBid: getStartingBid(formattedGeekListItemBody),
      softReserve: getSoftReserve(formattedGeekListItemBody),
      buyItNow: getBuyItNow(formattedGeekListItemBody),
    };
  });

  return items;
}
