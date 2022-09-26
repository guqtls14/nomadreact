import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

import { useState } from "react";
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

// interface
interface RouteState {
  name: boolean;
}

const Coin = () => {
  // loading
  const [loading, setLoading] = useState(true);

  const {
    // state: { name },
    state,
  } = useLocation(); // location.state.name

  const { coinId } = useParams();
  //   console.log(useParams()); {coinId: '22'}
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
