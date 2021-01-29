export const fetchGeekListXml = async (geeklistId: number) => {
  const url = `http://www.boardgamegeek.com/xmlapi/geeklist/${geeklistId}`;
  const options: RequestInit = { mode: 'no-cors' };
  return await fetch(url, options)
    .then(response => response.text())
    .catch(error => {
      console.error(error);
      return `An error occurred trying to get the GeekList with id: ${geeklistId}`;
    });
};