import { createBrowserRouter } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import NotFound from "./routes/NotFound";
import Price from "./routes/Price";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    // path: "/",
    path: `${process.env.PUBLIC_URL}/`,
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId/",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
