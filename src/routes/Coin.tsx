import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* width: 100%; */
  /* height: 5rem; */
  padding: 1rem; // width, height 대신 이렇게!
  background-color: white;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  font-size: 1rem;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  span:first-child {
    font-size: 0.75rem;
    font-weight: 700;
    opacity: 0.6;
  }
  p {
    line-height: 1.5;
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

export default function Coin() {
  const { coinId } = useParams<string>();
  const { state } = useLocation();
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  console.log("infoData", infoData);
  console.log("tickersData", tickersData);

  const isLoading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Title>
          {state ? state.name : isLoading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <DetailContainer>
          <Overview>
            <OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>현재가</span>
              <span>${tickersData?.quotes?.USD?.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>총량</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 발행량</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>{infoData?.description}</p>
            </OverviewItem>
          </Overview>
        </DetailContainer>
      )}
    </Container>
  );
}
