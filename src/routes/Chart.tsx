import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";

// apexchart
import ApexChart from "react-apexcharts";

// apexchart
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

interface CharProps {
  coinId: string;
}

// toggleDark interface
interface IRouterProps {
  isDark: boolean;
}

const Chart = ({ isDark }: IRouterProps) => {
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
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () =>
      // useOutletContext이용
      // fetchCoinHistory(coinId)

      // useParams이용해서 데이터넣기
      fetchCoinHistory(params.coinId!),
    {
      refetchInterval: 10000,
    }
  );

  console.log("d1: ", data);
  return (
    <div>
      {isLoading ? (
        "Loading Chart.."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) as number[],
            },
          ]}
          width="100%"
          height="460px"
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "tranparent",
            },
            stroke: { curve: "smooth", width: 5 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: { labels: { show: false } },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"] },
            },
            colors: ["red"],
          }}
        />
      )}
    </div>
  );
};

export default Chart;
