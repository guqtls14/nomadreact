import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  // 데이터 얻는법
  // axios.get(url).then(res => console.log(res.data))
  return await axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

// coin fetch function
export async function fetchCoinInfo(coinId: string) {
  return await axios.get(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
}

// price fetch function
export async function fetchCoinTickers(coinId: string) {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.data);
}

// Chart fetcher
export const fetchCoinHistory = async (coinId: string) => {
  // miliseconds / 1000 = seconds
  //   const endDate = Math.floor(Date.now() / 1000);
  //   1주일전 계산
  //   const startDate = endDate - 60 * 60 * 24 * 7;
  console.log("f11: ", coinId);
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
};
