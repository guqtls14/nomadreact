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
