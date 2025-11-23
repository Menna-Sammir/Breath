import { ChevronLeft, ChevronRight, Luggage, MoveUpRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  destinations1,
  destinations2,
  destinations3,
  destinations4,
  destinations5,
} from "../../assets/images";
import { Link } from "react-router";

const GlobalDestinationsCarousel = () => {
  const destinations = [
    {
      image: destinations1,
      city: "Paris, France",
      description:
        "Stroll the cobbled streets, cruise the Seine, and fall in love with every corner.",
      packages: "5+",
    },
    {
      image: destinations2,
      city: "Bali, Indonesia",
      description:
        "From serene rice terraces to soulful beaches, where peace meets play.",
      packages: "5+",
    },
    {
      image: destinations3,
      city: "Kyoto, Japan",
      description:
        "Where tradition meets tranquility—shrines, gardens, and geishas.",
      packages: "5+",
    },
    {
      image: destinations4,
      city: "Banff, Canada",
      description:
        "Majestic mountains, glacier-fed lakes, and trails that thrill.",
      packages: "5+",
    },
    {
      image: destinations5,
      city: "Reykjavík, Iceland",
      description:
        "From the Northern Lights to glacier hikes, Iceland is a dream for thrill-seekers.",
      packages: "5+",
    },
  ];

  return (
    <div className="bg-blue py-12 lg:py-20">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:mb-12">
          <div className="space-y-3 lg:space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1.5 text-sm text-white lg:px-4 lg:py-2.5 lg:text-lg/6 ">
              Top Global Destinations
            </span>
            <h2 className="w-full max-w-185.75 text-2xl font-medium text-white sm:text-3xl lg:text-4xl/11 xl:text-5xl/16 font-playfair italic">
              Explore <span className="font-playfair italic">iconic</span>{" "}
              places
              <span className="block">
                that inspire{" "}
                <span className="font-playfair italic">
                  wanderlust worldwide.
                </span>
              </span>
            </h2>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="global-destinations-button-prev grid size-10 place-content-center rounded-full bg-white/20 text-white transition hover:text-white/70"
            >
              <ChevronLeft className="size-6.5" />
            </button>
            <button
              type="button"
              className="global-destinations-button-next grid size-10 place-content-center rounded-full bg-white/20 text-white transition hover:text-white/70"
            >
              <ChevronRight className="size-6.5" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView="auto"
          navigation={{
            prevEl: ".global-destinations-button-prev",
            nextEl: ".global-destinations-button-next",
          }}
          breakpoints={{
            640: { spaceBetween: 24 },
            1024: { spaceBetween: 32 },
          }}
          className="swiper global-destinations-swiper"
        >
          <div className="swiper-wrapper">
            {destinations.map((dest, idx) => (
              <SwiperSlide key={idx} className="swiper-slide w-fit!">
                <div className="relative h-96! w-65! overflow-hidden rounded-3xl text-white transition-all! duration-300! hover:w-75! lg:h-125! lg:w-85! lg:hover:w-95!">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="p-4 text-center lg:p-6">
                      <span className="inline-flex w-fit gap-2 rounded-full bg-black/20 px-4 py-2.5 text-sm shadow-lg lg:text-lg">
                        <Luggage className="size-5 shrink-0 lg:size-6" />
                        {dest.packages} Packages Available
                      </span>
                    </div>

                    <div className="relative z-1 bg-gradient-to-t from-black/80 from-10% via-black/20">
                      <span className="absolute inset-0 -z-1 mask-[linear-gradient(rgba(0,0,0,0.2),black,black)] backdrop-blur-[20px]"></span>
                      <div className="relative space-y-3 p-4 pt-6 lg:space-y-4 lg:p-6 lg:pt-12">
                        <h3 className="text-2xl/7 lg:text-[32px]/10.5">
                          {dest.city}
                        </h3>
                        <p className="line-clamp-2">{dest.description}</p>
                        <Link
                          to={`/activities?city=${encodeURIComponent(dest.city.split(",")[0])}`}
                          className="btn w-full justify-between"
                        >
                          Explore {dest.city.split(",")[0]}
                          <MoveUpRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default GlobalDestinationsCarousel;
