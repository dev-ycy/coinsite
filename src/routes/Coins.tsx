import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 2rem;
  max-width: 30rem;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.header`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 700;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 100%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);

  a {
    display: flex;
    width: 100%;
    padding: 1.25rem;
    transition: color 0.2s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { data, isLoading } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  onError={(i) =>
                    (i.currentTarget.src =
                      "https://img.freepik.com/free-photo/paper-texture-with-pattern_107441-39.jpg?w=826&t=st=1683877743~exp=1683878343~hmac=25bc2b3eaf4335f6887104a32e5803abdf1a7dc06b47126646e084ba81e379d6")
                  }
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
