import { chooseImg, choosebg, mapLine } from "../../assets/images";
import { Globe, Map, TicketsPlane } from "lucide-react";

export default function ChooseUs() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-12 lg:py-20"
      style={{ backgroundImage: `url(${choosebg})` }}
    >
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-4 lg:mb-20 xl:flex-row xl:items-end">
          <div className="w-full space-y-4">
            <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1.5 text-sm lg:px-4 lg:py-2.5 lg:text-lg/6">
              Why travelers choose us
            </span>
            <h2 className="w-full max-w-122.5 text-2xl font-medium text-black sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
              Tailored
              <span className="font-playfair italic">journeys</span>
              with real
              <span className="font-playfair italic">value</span>
              and
              <span className="font-playfair italic">support.</span>
            </h2>
          </div>
          <p className="text-gray-dark w-full max-w-150 lg:text-lg/6">
            Enjoy curated itineraries, transparent pricing, and 24/7 assistance
            from local experts who truly care. Because your travel should be
            effortless, enriching, and entirely yours.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-7 sm:gap-10 lg:flex-row xl:gap-20 2xl:gap-31">
          <div className="relative grow">
            <div className="relative z-1 mx-auto w-full max-w-150 lg:mr-0 lg:-mb-10 lg:-ml-7 lg:max-w-178">
              <img src={chooseImg} alt="choose us" className="h-full w-full" />
            </div>
            <img
              src={mapLine}
              alt="map line"
              className="absolute -top-5 left-1/2 w-150 -translate-x-1/2 sm:-top-10 lg:-left-5 lg:w-full lg:shrink-0 lg:-translate-x-0 2xl:-top-24 2xl:h-166.75"
            />
          </div>
          <div className="text-gray-dark relative w-full space-y-4 lg:max-w-120 xl:max-w-150">
            <div className="bg-gray-light flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:px-5 xl:px-8 xl:py-6">
              <div className="grid size-14 shrink-0 place-content-center rounded-2xl bg-black/5 text-black sm:size-21">
                <Globe className="size-9 stroke-[1.5px]! sm:size-13.5" />
              </div>
              <div className="space-y-2.5 xl:space-y-4">
                <h3 className="text-lg text-black lg:text-xl/6">
                  Curated Global Packages
                </h3>
                <p>
                  From romantic Parisian getaways to African safaris - all trips
                  are handpicked for quality, comfort, and value.
                </p>
              </div>
            </div>
            <div className="bg-gray-light flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:px-5 xl:px-8 xl:py-6">
              <div className="grid size-14 shrink-0 place-content-center rounded-2xl bg-black/5 text-black sm:size-21">
                <Map className="size-9 stroke-[1.5px]! sm:size-13.5" />
              </div>
              <div className="space-y-2.5 xl:space-y-4">
                <h3 className="text-lg text-black lg:text-xl/6">
                  Flexibility & Customization
                </h3>
                <p>
                  Adjust itineraries, travel dates, and experiences to match
                  your pace and preferences. No one-size-fits-all here.
                </p>
              </div>
            </div>
            <div className="bg-gray-light flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:px-5 xl:px-8 xl:py-6">
              <div className="grid size-14 shrink-0 place-content-center rounded-2xl bg-black/5 text-black sm:size-21">
                <TicketsPlane className="size-9 stroke-[1.5px]! sm:size-13.5" />
              </div>
              <div className="space-y-2.5 xl:space-y-4">
                <h3 className="text-lg text-black lg:text-xl/6">
                  Secure Booking & Support
                </h3>
                <p>
                  Book confidently with our encrypted payment gateway and 24/7
                  multilingual customer support for any help, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
