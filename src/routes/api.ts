import axios from "axios";

export const fetchCoins = async () => {
  // 데이터 얻는법
  // axios.get(url).then(res => console.log(res.data))
  return await axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
};
