import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

interface IContext {
  coinId?: string;
}

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const context = useOutletContext<IContext>();
  const { coinId } = context;
  const { isLoading, data } = useQuery<IData[]>(["history", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "data",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "light",
            },
            chart: {
              width: 500,
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            grid: {
              show: false,
            },
            // categories: data?.map(
            //   (price) => new Date(price.time_close / 1000 / 60 / 60 / 24)
            // ),
          }}
        />
      )}
    </>
  );
}
