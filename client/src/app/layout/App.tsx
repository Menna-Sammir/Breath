import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useOutlet,
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
import NotFound from "../../features/errors/NotFound";

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
      }, 500); // delay 0.5 second
    } else {
      setDelayedLoading(false);
    }

    return () => clearTimeout(timer);
  }, [showLoading]);

  const outlet = useOutlet();

  return (
    <div className="bg-[#eeeeee] min-h-screen flex flex-col">
      {delayedLoading && <LoadingPage />}

      <ScrollRestoration />

      {!["/login", "/register", "/confirm-email"].includes(
        location.pathname
      ) && <NavBar />}

      <main className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full flex-1 px-0 py-0 mx-auto">
        {location.pathname === "/" ? (
          <HomePage />
        ) : outlet ? (
          <div className="w-full">
            <Outlet />
          </div>
        ) : (
          <NotFound />
        )}
      </main>

      <Footer />
    </div>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
