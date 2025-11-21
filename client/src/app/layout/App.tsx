import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";
import "./App.css";
import NavBar from "./NavBar";
import HomePage from "../../features/home/homepage";
import LoadingPage from "./LoadingPage";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/stores/store";
import { useIsFetching } from "@tanstack/react-query";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const navigation = useNavigation();
  const { uiStore } = useStore();
  const isFetching = useIsFetching();

  const showLoading =
    uiStore.isLoading || navigation.state === "loading" || isFetching > 0;

  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (showLoading) {
      timer = setTimeout(() => {
        if (showLoading) {
          setDelayedLoading(true);
        }
      }, 2000); // delay 2 seconds
    } else {
      setDelayedLoading(false);
    }

    return () => clearTimeout(timer);
  }, [showLoading]);

  return (
    <div className="bg-[#eeeeee] min-h-screen">
      {delayedLoading && <LoadingPage />}

      <ScrollRestoration />

      {!["/login", "/register", "/confirm-email"].includes(
        location.pathname
      ) && <NavBar />}

      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full">
          <Outlet />
        </div>
      )}

      <Footer />
    </div>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
