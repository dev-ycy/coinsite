import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled, { useTheme } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./../atoms";

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
  const theme = useTheme();
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 300,
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
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
            },
            yaxis: {
              show: false,
            },
            grid: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            colors: [theme.accentColor],
            // categories: data?.map(
            //   (price) => new Date(price.time_close / 1000 / 60 / 60 / 24)
            // ),
          }}
        />
      )}
    </>
  );
}
