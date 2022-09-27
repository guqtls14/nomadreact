import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
interface CharProps {
  coinId: string;
}

const Chart = () => {
  // url에관한 정보를 얻는법은 2가지이다
  // 부모 컴포넌트(Outlet)에서 url에관한 정보를얻는 useOutletContext
  // useParams를 이용하는방법
  // 2가지중 아무거나 선택하면됨
  // https://nomadcoders.co/react-masterclass/lectures/3323

  const { coinId } = useOutletContext<CharProps>();
  // console.log("1", useOutletContext()); //1 {coinId: 'bnb-binance-coin'}
  const params = useParams();

  // console.log("11", coinId); //11 bnb-binance-coin

  // react-query
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    // useOutletContext이용
    // fetchCoinHistory(coinId)

    // useParams이용해서 데이터넣기
    fetchCoinHistory(params.coinId!)
  );
  return <div>Chart</div>;
};

export default Chart;
