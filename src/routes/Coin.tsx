import { useParams, useNavigate } from "react-router-dom";
import { useLocation, Outlet, Link, NavLink, useMatch } from "react-router-dom";

import styled from "styled-components";

import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";

import { Helmet } from "react-helmet";

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
  font-size: 40px;
`;

// detail component

// Wrapper
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const Bundle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

// descript component
const Descript = styled.p`
  margin: 20px 0px;
`;

// Tab

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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
  // useMatch
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // // info
  // const [info, setinfo] = useState<IInfoData>();
  // // price
  // const [priceinfo, setPriceInfo] = useState<IPriceData>();
  // // loading
  // const [loading, setLoading] = useState(true);

  const {
    // state: { name },
    state,
  } = useLocation(); // location.state.name

  const { coinId } = useParams();

  // react-query 비동기처리
  // coin info
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  // coin price
  const { isLoading: tickersLoading, data: tickersData } = useQuery(
    ["ticker", coinId],
    () => fetchCoinTickers(coinId!)
    // refetch
    // {
    //   refetchInterval: 5000,
    // }
  );

  // https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string/54496418
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

  // useEffect 비동기처리
  // info data
  // const InfoData = async () => {
  //   const response = await axios.get(
  //     `https://api.coinpaprika.com/v1/coins/${coinId}`
  //   );
  //   const res = response.data;
  //   setinfo(res);
  // };
  // // price data
  // const PriceData = async () => {
  //   const response = await axios.get(
  //     `https://api.coinpaprika.com/v1/tickers/${coinId}`
  //   );
  //   const res = response.data;
  //   setPriceInfo(res);
  // };
  // // useEffect
  // useEffect(() => {
  //   InfoData();
  //   PriceData();
  //   setLoading(false);
  // }, [coinId]);

  // loading 변수(로딩 종류가 2개이므로..)
  const loading = infoLoading || tickersLoading;

  console.log("tickersData: ", tickersData);

  const navigate = useNavigate();
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {/* {state?.name || "loading..."} */}
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      <button onClick={() => navigate("/")}>Back</button>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Wrapper>
            <Bundle>
              <span>Rank</span>
              <span>{tickersData?.rank}</span>
            </Bundle>
            <Bundle>
              <span>SYMBOL</span>
              <span>{tickersData?.symbol}</span>
            </Bundle>
            <Bundle>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price}</span>
            </Bundle>
          </Wrapper>
          <Descript>{infoData?.description}</Descript>
          <Wrapper>
            <Bundle>
              <span>TOTAL SUPLY:</span>
              <span>{tickersData?.total_supply}</span>
            </Bundle>
            <Bundle>
              <span>MAX SUPPLY:</span>
              <span>{tickersData?.max_supply}</span>
            </Bundle>
          </Wrapper>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>

            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
};

export default Coin;
