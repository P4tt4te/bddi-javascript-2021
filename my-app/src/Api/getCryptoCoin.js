export async function getCryptoCoin(coinname) {
  return await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinname}?localization=false`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getCryptoWeekData(coinname) {
  return await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinname}/market_chart?vs_currency=eur&days=7&interval=daily`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}
