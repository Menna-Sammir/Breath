import { Link } from "react-router";
import { useStore } from "../../lib/hooks/useStore";
import UserMenu from "./UserMenu";
import { useAccount } from "../../lib/hooks/useAccounts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Menu, X, MoveUpRight, LoaderCircle } from "lucide-react";
import { Observer } from "mobx-react-lite";
import { logo, logoLight } from "../../assets/images";


export default function NavBar() {
  const { currentUser } = useAccount();
  const { uiStore } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 z-50 pt-3 duration-300 lg:pt-10",
          isScrolled && "pt-0 lg:pt-0 bg-white xl:backdrop-blur-xl shadow-md"
        )}
      >
        {/* Overlay */}
        <div
          className={clsx(
            "overlay fixed inset-0 z-40 bg-white/10 backdrop-blur-md transition-all",
            showHeaderMenu ? "block" : "hidden"
          )}
          onClick={() => setShowHeaderMenu(false)}
        ></div>

        {/* Container */}
        <div className="container flex items-center justify-between gap-5 py-2.5">
          <Link to="/" className="inline-flex shrink-0">
            <img
              src={
                isScrolled
                  ? logo
                  : logoLight
              }
              alt="logo"
              className=" w-auto h-20"
            />
          </Link>

          {/* Menu */}
          <div
            className={clsx(
              "fixed top-0 -right-full z-50 flex h-screen w-80 flex-col gap-0 overflow-x-hidden overflow-y-auto bg-white/70 pb-5 shadow-sm backdrop-blur-xs transition-all duration-500 xl:static xl:right-auto xl:h-auto xl:w-auto xl:flex-row xl:items-center xl:overflow-hidden xl:bg-transparent xl:p-0 xl:shadow-none xl:backdrop-blur-none",
              showHeaderMenu && "right-0"
            )}
          >
            <div className="sticky top-0 z-50 flex shrink-0 justify-between bg-white p-5 shadow-2xs backdrop-blur-xs xl:hidden xl:p-0">
              <Link to="/" className="inline-flex">
                <img
                  src={logo}
                  alt="logo"
                  className="h-8.5 w-auto"
                />
              </Link>
              <button
                type="button"
                className="group cursor-pointer text-black transition hover:opacity-70"
                onClick={() => setShowHeaderMenu(false)}
              >
                <X className="size-5 shrink-0" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <ul
              className={clsx(
                "flex flex-col justify-center gap-2 p-4 xl:flex-row xl:items-center xl:rounded-full xl:bg-white/30 xl:px-2 xl:py-2.5 xl:backdrop-blur-xs",
                isScrolled && "xl:bg-transparent xl:backdrop-blur-none menu"
              )}
            >
              {[
                ["Home", "/"],
                ["Destination", "activities"],
                ["Experiences", "#"],
                ["Tours & Packages", "#"],
                ["About", "#"],
                ["Blog", "#"],
                ["Contact", "#"],
                ["FAQs", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    to={href}
                    className={clsx("nav-links", label === "Home" && "active")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className={clsx("btn", isScrolled && "btn-primary")}
              >
                Login
                <MoveUpRight size={18} />
              </Link>
            )}

            <button
              type="button"
              className={clsx(
                "group cursor-pointer text-white transition hover:opacity-70 xl:hidden",
                isScrolled && "text-black"
              )}
              onClick={() => setShowHeaderMenu(!showHeaderMenu)}
            >
              <Menu className="size-6 shrink-0" />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <Observer>
        {() =>
          uiStore.isLoading ? (
            <LoaderCircle
              size={20}
              style={{ position: "absolute", top: "30%", left: "105%" }}
            />
          ) : null
        }
      </Observer>
    </>
  );
}
