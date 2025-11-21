import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, storesContext } from "./lib/stores/store";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import "flatpickr/dist/flatpickr.min.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <storesContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            theme="colored"
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </storesContext.Provider>
    </LocalizationProvider>
  </StrictMode>
);
