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
  console.log("Data: ", data);
  const y = data?.map((price) => parseFloat(price.high));
  const y1 = data?.map((price) => parseFloat(price.low));
  const y2 = data?.map((price) => parseFloat(price.close));

  console.log("y1: ", y);
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
              // data: data?.map((price) => parseFloat(price.close)) as number[],
              data: [
                {
                  x: new Date(),
                  y: y,
                },
                {
                  x: new Date(),
                  y: y1,
                },
                {
                  x: new Date(),
                  y: y2,
                },
              ],
            },
          ]}
          options={{
            // stroke: {
            //   curve: "straight",
            // },
            chart: {
              height: 350,
            },
          }}
          title={{
            text: "CandleStick Chart",
            align: "left",
          }}
          xaxis={{
            type: "datetime",
          }}
          yaxis={{
            tooltip: {
              enabled: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;
