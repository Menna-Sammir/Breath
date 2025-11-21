import React from "react";
import { Link } from "react-router";
import { footerBanner } from "../../assets/images";
import { MoveUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="after:from-blue after:to-blue/80 relative mt-auto bg-cover bg-no-repeat text-white after:absolute after:inset-0 after:bg-gradient-to-l sm:after:from-40%"
      style={{ backgroundImage: `url(${footerBanner})` }}
    >
      <div className="relative z-10 container">
        <div className="flex flex-col justify-between gap-10 pt-12 lg:pt-16 xl:flex-row">
          <div className="flex flex-col justify-between gap-8 sm:flex-row lg:gap-10">
            <div>
              <Link to="/" className="inline-flex shrink-0">
                <img
                  src="assets/images/logo.svg"
                  alt="logo"
                  className="h-8 w-auto sm:h-9.5"
                />
              </Link>
              <p className="mt-2 mb-4 text-sm/4.5 font-medium lg:mb-6">
                Travel beyond destinations
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="tel:+441512223344"
                  target="_blank"
                  className="grid size-7.5 place-content-center rounded-full bg-white/20 text-white transition hover:opacity-80"
                >
                  <i data-lucide="phone" className="size-4.5 shrink-0"></i>
                  <span className="sr-only">Call</span>
                </Link>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  className="grid size-7.5 place-content-center rounded-full bg-white/20 text-white transition hover:opacity-80"
                >
                  <i data-lucide="instagram" className="size-4.5 shrink-0"></i>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  to="mailto:support@example.com"
                  target="_blank"
                  className="grid size-7.5 place-content-center rounded-full bg-white/20 text-white transition hover:opacity-80"
                >
                  <i
                    data-lucide="message-circle"
                    className="size-4.5 shrink-0"
                  ></i>
                  <span className="sr-only">Message</span>
                </Link>
                <Link
                  to="https://www.facebook.com"
                  target="_blank"
                  className="grid size-7.5 place-content-center rounded-full bg-white/20 text-white transition hover:opacity-80"
                >
                  <i data-lucide="facebook" className="size-4.5 shrink-0"></i>
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
            <div className="w-full space-y-5 sm:max-w-93 lg:space-y-6 xl:hidden">
              <h2 className="text-2xl/6">Company</h2>
              <div className="space-y-4">
                <form className="relative">
                  <input
                    type="text"
                    className="w-full rounded-full border-0! bg-white py-3 pr-14 pl-4 text-base/5 text-black ring-0! outline-none! placeholder:text-[#848381]"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="group absolute top-1/2 right-4 -translate-y-1/2 text-black"
                  >
                    <i
                      data-lucide="move-up-right"
                      className="size-8 shrink-0 transition duration-300 group-hover:rotate-45"
                    ></i>
                    ll
                  </button>
                </form>
                <p className="text-sm/4.5">
                  By subscribing you agree to with our&nbsp;
                  <Link
                    to="privacy-policy.html"
                    className="font-medium underline hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5 gap-y-10 md:flex md:justify-between lg:gap-8 xl:w-auto xl:justify-center 2xl:gap-14">
            <div className="space-y-3.5 sm:space-y-5 lg:space-y-6 2xl:min-w-33.5">
              <h2 className="text-xl/6">Company</h2>
              <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4">
                <Link to="/about-us.html" className="footer-links">
                  About
                </Link>
                <Link to="/contact-us.html" className="footer-links">
                  Contact
                </Link>
                <Link to="/blog.html" className="footer-links">
                  Blog
                </Link>
                <Link to="/faqs.html" className="footer-links">
                  FAQs
                </Link>
                <Link to="/userside-profile.html" className="footer-links">
                  My profile
                </Link>
              </div>
            </div>
            <div className="space-y-3.5 sm:space-y-5 lg:space-y-6 2xl:min-w-33.5">
              <h2 className="text-xl/6">Countries</h2>
              <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4">
                <Link to="/destination-packages.html" className="footer-links">
                  Asia
                </Link>
                <Link to="/destination-packages.html" className="footer-links">
                  Europe
                </Link>
                <Link to="/destination-packages.html" className="footer-links">
                  North America
                </Link>
                <Link to="/destination-packages.html" className="footer-links">
                  Africa
                </Link>
                <Link to="/destination-packages.html" className="footer-links">
                  Oceania
                </Link>
              </div>
            </div>
            <div className="space-y-3.5 sm:space-y-5 lg:space-y-6">
              <h2 className="text-xl/6">Packages</h2>
              <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4">
                <Link to="/tours-packages.html" className="footer-links">
                  Bali uncovered
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  Tokyo & Kyoto Explorer
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  Swiss Alps Lakes Getaway
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  Maldives Experience
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  Morocco Desert & Medina
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  New York Roadtrip
                </Link>
              </div>
            </div>
            <div className="space-y-3.5 sm:space-y-5 lg:space-y-6 2xl:min-w-33.5">
              <h2 className="text-xl/6">Quick Links</h2>
              <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4">
                <Link to="/destination.html" className="footer-links">
                  Destinations
                </Link>
                <Link to="/experiences.html" className="footer-links">
                  Experiences
                </Link>
                <Link to="/tours-packages.html" className="footer-links">
                  Tours & Packages
                </Link>
                <Link to="/persoinalised-trip.html" className="footer-links">
                  Personalized trip
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden w-full max-w-93 space-y-5 lg:space-y-6 xl:block">
            <h2 className="text-2xl/6">Newsletter</h2>
            <div className="space-y-4">
              <form className="relative">
                <input
                  type="text"
                  className="w-full rounded-full border-0! bg-white py-3 pr-14 pl-4 text-base/5 text-black ring-0! outline-none! placeholder:text-[#848381]"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="group absolute top-1/2 right-4 -translate-y-1/2 text-black"
                >
                  <MoveUpRight className="size-8 shrink-0 transition duration-300 group-hover:rotate-45" />
                </button>
              </form>
              <p className="text-sm/4.5">
                By subscribing you agree to with our&nbsp;
                <Link
                  to="privacy-policy.html"
                  className="font-medium underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-5 py-7.5 md:flex-row">
          <div
            className="text-center text-base"
            x-data="{ currentYear: new Date().getFullYear() }"
          >
            © <span x-text="currentYear"></span>&nbsp;Wayfare. All rights
            reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-nowrap">
            <Link to="/terms-conditions.html" className="footer-links">
              Terms & conditions
            </Link>
            <Link to="/privacy-policy.html" className="footer-links">
              Privacy Policy
            </Link>
            <Link to="/refund-policy.html" className="footer-links">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
