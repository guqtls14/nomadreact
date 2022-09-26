import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useEffect, useState } from "react";
const Container = styled.div`
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  text-align: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

// 여기는 안쓰지만 이중 타입(?)의 예시로 만들어봄

// Tag Interface
// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }

// // Team Interface
// interface ITeam {
//   id: string;
//   name: string;
//   position: string;
// }

// info interface
//  interface인걸 표시하기위해서 대문자 I붙임

// 쉽게 타입스크립트 타입 만드는법
// 1.개발자도구에서 현재 찾고싶은 데이터의 state를 console로 찍고 오른쪽마우스로 global variable을 찾으면 temp1,temp2이런식으로나옴
// 2.Object.keys(temp1).join()으로 해당 타입의 키를 문자열로 출력하고 설정
// 3.해당 키의 타입을 만들려면 Object.values(temp1).map(item=>typeof item).join()으로 타입을 선택하고 나열!
// 참고 https://nomadcoders.co/react-masterclass/lectures/3319

// Object interface

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // 객체안의 배열..
  // tags: ITag[];
  // team: ITeam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
// price interface

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  //   quotes: object;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Coin = () => {
  // info
  const [info, setinfo] = useState<IInfoData>();
  // price
  const [priceinfo, setPriceInfo] = useState<IPriceData>();
  // loading
  const [loading, setLoading] = useState(true);

  const {
    // state: { name },
    state,
  } = useLocation(); // location.state.name

  const { coinId } = useParams();
  //   console.log(useParams()); {coinId: '22'}

  // info data
  const InfoData = async () => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/coins/${coinId}`
    );
    const res = response.data;
    setinfo(res);
  };
  // price data
  const PriceData = async () => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${coinId}`
    );
    const res = response.data;
    setPriceInfo(res);
  };
  // useEffect
  useEffect(() => {
    InfoData();
    PriceData();
  }, []);
  console.log("info: ", info);
  console.log("priceinfo: ", priceinfo);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading..."}</Title>
      </Header>
      {loading ? <Loading>Loading...</Loading> : null}
    </Container>
  );
};

export default Coin;
