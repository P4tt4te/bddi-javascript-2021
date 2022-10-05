

export const getCryptoCoin = (coinname) => {
  fetch(`https://api.coingecko.com/api/v3/coins/${coinname}?localization=false`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
