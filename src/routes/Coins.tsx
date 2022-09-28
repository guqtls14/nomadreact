import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { useQuery } from "react-query";
import { fetchCoins } from "./api";

import { Helmet } from "react-helmet";

// recoil
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
const Container = styled.div`
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinsList = styled.ul`
  margin: 0 auto;
  width: 50%;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;

  a {
    transition: color 0.2s ease-in;
    display: block;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// const coins = [
//   {
//     id: "btc-bitcoin",
//     name: "Bitcoin",
//     symbol: "BTC",
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "eth-ethereum",
//     name: "Ethereum",
//     symbol: "ETH",
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: "coin",
//   },
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
// ];

// type
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// toggleDark interface
interface IRouterProps {}

const Coins = () => {
  // atom value 설정할때사용
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  // react query fetching
  // useQuery는 fetcher함수를 불러들이는데 fetcher함수는 여기서 api.ts에있는 코드임
  const { isLoading, data } = useQuery<ICoin[]>("allcoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Toggle BTN</button>
      </Header>
      {isLoading ? (
        <Loading>"Loading.."</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((item) => (
            <Coin key={item.id}>
              <Link to={`/${item.id}`} state={{ name: item.name }}>
                <CoinWrapper>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
                  />
                  {item.name} &rarr;
                </CoinWrapper>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
