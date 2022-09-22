import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  //   console.log(useParams()); {coinId: '22'}
  return <div>Coin: {coinId}</div>;
};

export default Coin;
