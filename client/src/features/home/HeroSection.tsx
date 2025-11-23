import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [from, setFrom] = useState("Berlin");
  const [to, setTo] = useState("Paris");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [tripDuration, setTripDuration] = useState("3-5 Days");
  const [durationOpen, setDurationOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(tomorrow);

  const cities = ["New York", "Toronto", "Tokyo", "London", "Paris", "Berlin"];
  const durations = ["1-3 Days", "3-5 Days", "5+ Days"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query parameters
    const params = new URLSearchParams();

    if (to) {
      params.append("city", to);
    }

    if (date) {
      params.append("startDate", date.toISOString());
    }

    // Navigate to activities page with filters
    navigate(`/activities?${params.toString()}`);
  };

  return (
    <div className="relative">
      <HeroCarousel />

      <div className="relative z-20 container pt-40 pb-10 lg:pt-60 xl:pt-70.5">
        <h1 className="mx-auto mb-6 max-w-220 text-center text-[26px]/9 text-white sm:mb-10 sm:text-4xl/10 lg:mb-16 lg:px-10 lg:text-5xl/15 xl:text-[56px]/19 2xl:px-0 font-playfair font-medium italic">
          Wander beyond the
          <span className="font-playfair font-medium italic">bucket list.</span>
          Discover
          <span className="font-playfair font-medium italic">places</span>
          that change how you
          <span className="font-playfair font-medium italic">
            see the world.
          </span>
        </h1>

        <form
          onSubmit={handleSearch}
          className="relative z-20 flex w-full flex-col gap-6 rounded-2xl bg-white px-4 py-5 sm:px-8 lg:mx-auto lg:max-w-253 lg:flex-row lg:items-center lg:rounded-full lg:py-4 xl:gap-6"
        >
          <div className="flex grow flex-col gap-3 lg:flex-row lg:gap-4 xl:gap-6">
            {/* From */}
            <div className="w-full space-y-1 lg:max-w-35 lg:space-y-2">
              <label className="block font-medium">From</label>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setFromOpen(!fromOpen)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 text-lg/6 font-medium text-black lg:text-xl/6.5"
                >
                  <span className="line-clamp-1 truncate text-left">
                    {from}
                  </span>
                  <ChevronDown className="size-4.5 shrink-0" />
                </button>
                {fromOpen && (
                  <div className="border-gray-light text-gray absolute inset-x-0 top-full z-50 mt-5 min-w-37 space-y-2 overflow-y-auto rounded-b-lg border bg-white px-4 py-6 text-base/5.5 shadow-[0_0_24px_0_rgba(0,0,0,0.1)] lg:border-0">
                    {cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        className={`block w-full text-left transition hover:text-black/90 ${from === city ? "text-black" : ""}`}
                        onClick={() => {
                          setFrom(city);
                          setFromOpen(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span className="via-gray/50 bg-gray/20 block h-px shrink-0 from-white to-white lg:h-auto lg:w-0.5 lg:bg-gradient-to-t"></span>

            {/* To Destination */}
            <div className="w-full space-y-1 lg:max-w-35 lg:space-y-2">
              <label className="block font-medium">To Destination</label>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setToOpen(!toOpen)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 text-lg/6 font-medium text-black lg:text-xl/6.5"
                >
                  <span className="line-clamp-1 truncate text-left">{to}</span>
                  <ChevronDown className="size-4.5 shrink-0" />
                </button>
                {toOpen && (
                  <div className="border-gray-light text-gray absolute inset-x-0 top-full z-50 mt-5 min-w-37 space-y-2 overflow-y-auto rounded-b-lg border bg-white px-4 py-6 text-base/5.5 shadow-[0_0_24px_0_rgba(0,0,0,0.1)] lg:border-0">
                    {cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        className={`block w-full text-left transition hover:text-black/90 ${to === city ? "text-black" : ""}`}
                        onClick={() => {
                          setTo(city);
                          setToOpen(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span className="via-gray/50 bg-gray/20 block h-px shrink-0 from-white to-white lg:h-auto lg:w-0.5 lg:bg-gradient-to-t"></span>

            {/* Departure Date */}
            <div className="shrink-0 space-y-1 lg:w-46.5 lg:space-y-2">
              <label className="block font-medium">Departure Date</label>
              <div className="calender relative z-1 w-full grow items-center gap-2 text-black">
                <Flatpickr
                  className="calender w-full border-none! bg-transparent! p-0 pr-6.5! text-lg/6 font-medium ring-0! outline-0! lg:text-xl/6.5"
                  x-ref="picker"
                  id="picker"
                  x-model="value"
                  value={date}
                  onChange={(selectedDates) =>
                    setDate(selectedDates[0] || null)
                  }
                />
                <ChevronDown className="absolute top-1/2 right-0 -z-1 size-4.5 shrink-0 -translate-y-1/2" />
              </div>
            </div>

            <span className="via-gray/50 bg-gray/20 block h-px shrink-0 from-white to-white lg:h-auto lg:w-0.5 lg:bg-gradient-to-t"></span>

            {/* Trip Duration */}
            <div className="w-full space-y-1 lg:max-w-35 lg:space-y-2">
              <label className="block font-medium">Trip Duration</label>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setDurationOpen(!durationOpen)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 text-lg/6 font-medium text-black lg:text-xl/6.5"
                >
                  <span className="line-clamp-1 text-left">{tripDuration}</span>
                  <ChevronDown className="size-4.5 shrink-0" />
                </button>
                {durationOpen && (
                  <div className="border-gray-light text-gray absolute inset-x-0 top-full z-50 mt-5 min-w-37 space-y-2 overflow-y-auto rounded-b-lg border bg-white px-4 py-6 text-base/5.5 shadow-[0_0_24px_0_rgba(0,0,0,0.1)] lg:border-0">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        className={`relative flex w-full text-left transition hover:text-black/90 ${tripDuration === dur ? "text-black" : ""}`}
                        onClick={() => {
                          setTripDuration(dur);
                          setDurationOpen(false);
                        }}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary hover:[&>svg]:rotate-0"
          >
            <Search />
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default HeroSection;
