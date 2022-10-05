export function getCryptoCoin() {
  fetch("https://api.coinranking.com/v2/coins?symbols[]=BTC", {
    headers: {
      accept: "*/*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "cross-site",
    },
    referrer: "http://localhost:3001/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "no-cors",
    credentials: "omit",
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
}
