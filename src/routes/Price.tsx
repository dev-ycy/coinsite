import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { IPriceData } from "./Coin";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";

const BigGridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* height: 5rem; */
  padding: 1rem; // width, height 대신 이렇게!
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  font-size: 1rem;
  span:first-child {
    font-size: 0.75rem;
    font-weight: 700;
    opacity: 0.6;
    line-height: 1.5;
  }
  div {
    font-size: 1.75rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 1rem;
  padding: 1rem; // width, height 대신 이렇게!
`;

const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.6;
`;

interface ITickersData {
  tickersData: IPriceData;
}

interface IProps {
  percentage: number;
  className?: string;
}

function PriceIndicator({ percentage, className }: IProps) {
  return (
    <div className={className}>
      <div>{percentage.toFixed(1)}%</div>
      {percentage > 0 ? (
        <MdTrendingUp />
      ) : percentage === 0 ? (
        <MdTrendingFlat />
      ) : (
        <MdTrendingDown />
      )}
    </div>
  );
}

const PriceIndicatorStyled = styled(PriceIndicator)<{ percentage: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.75rem;
  margin-top: 0.5rem;
  color: ${(props) =>
    props.percentage > 0 ? "red" : props.percentage === 0 ? "black" : "blue"};
`;

export default function Price() {
  const { tickersData } = useOutletContext<ITickersData>();
  console.log(tickersData);
  const quotes = tickersData.quotes.USD;
  const athDate = new Date(quotes.ath_date);
  const athDateString = athDate.toLocaleDateString("ko-KR"); // 사용자의 문화권에 맞는 시간표기법으로 객체의 시간을 리턴
  const athTimeString = athDate.toLocaleTimeString("ko-KR");

  return (
    <>
      <BigGridItem>
        <span>
          {athDateString} {athTimeString}
          <br />
          최고가 달성
        </span>
        <div>${quotes.ath_price.toFixed(3)}</div>
      </BigGridItem>
      <GridContainer>
        <GridItem>
          <Label>1시간 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_1h} />
        </GridItem>
        <GridItem>
          <Label>6시간 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_6h} />
        </GridItem>
        <GridItem>
          <Label>12시간 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_12h} />
        </GridItem>
        <GridItem>
          <Label>24시간 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_24h} />
        </GridItem>
        <GridItem>
          <Label>7일 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_7d} />
        </GridItem>
        <GridItem>
          <Label>30일 전보다</Label>
          <PriceIndicatorStyled percentage={quotes.percent_change_30d} />
        </GridItem>
      </GridContainer>
    </>
  );
}
