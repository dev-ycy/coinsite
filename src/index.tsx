import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Root />
    </QueryClientProvider>
  </>
);
