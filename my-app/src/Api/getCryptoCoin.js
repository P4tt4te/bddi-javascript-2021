export async function getCryptoCoin() {
  await fetch("https://api.coinranking.com/v2/coins?symbols[]=BTC", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "x-access-token":
        "coinranking3f183752ff98e851ccca0ec55ff282f0d7a62a264f61f863",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
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
