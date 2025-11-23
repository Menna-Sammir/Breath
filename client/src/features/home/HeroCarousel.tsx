import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { banner1, banner2, banner3 } from "../../assets/images";

const HeroCarousel = () => {
  const heroSlides = [
    { image: banner1, location: "Dahab" },
    { image: banner2, location: "Egypt" },
    { image: banner3, location: "Alex" },
  ];

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="swiper Hero-swiper absolute! inset-0"
    >
      {heroSlides.map((slide, idx) => (
        <SwiperSlide key={idx} className="relative">
          <img
            src={slide.image}
            alt="hero-banner"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 z-2 bg-gradient-to-b from-[#013248]/50 to-transparent"></span>
          <span className="from-blue to-blue/20 absolute inset-0 z-2 bg-gradient-to-t"></span>
          <div className="absolute inset-0 container">
            <div className="vertical-text absolute top-24 left-1/2 z-30 -translate-x-1/2 bg-gradient-to-b from-white to-transparent bg-clip-text text-4xl text-transparent sm:top-22 sm:text-5xl lg:top-1/2 lg:-right-15 lg:left-auto lg:-translate-x-0 lg:-translate-y-1/2 lg:bg-gradient-to-r lg:text-6xl/16 xl:text-[80px]">
              {slide.location}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
