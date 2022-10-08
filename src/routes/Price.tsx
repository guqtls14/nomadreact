import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import { useQuery } from "react-query";

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

// apexchart
import ApexChart from "react-apexcharts";
const Price = () => {
  const { coinId } = useParams();

  // react-query
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["pricewow", coinId],
    () =>
      // useOutletContext이용
      // fetchCoinHistory(coinId)

      // useParams이용해서 데이터넣기
      fetchCoinHistory(coinId!)
    // {
    //   refetchInterval: 10000,
    // }
  );

  let validData = data ?? [];
  if ("error" in validData) {
    validData = [];
  }

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: validData.map((price) => ({
                x: price.time_open * 1000,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          width="100%"
          height="460px"
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
              fontFamily: '"Pretendard", sans-serif',
            },
            xaxis: {
              // labels: {
              //   show: false,
              // },
              type: "datetime",
              categories: validData?.map((price) => price.time_close * 1000),
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            // yaxis: {
            //   labels: {
            //     show: false,
            //   },
            // },
          }}
          title={{
            text: "CandleStick Chart",
            align: "left",
          }}
        />
      )}
    </div>
  );
};

export default Price;
