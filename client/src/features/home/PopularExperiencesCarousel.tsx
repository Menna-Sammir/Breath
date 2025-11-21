
import { MoveUpRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {popularExperiences1, popularExperiences2, popularExperiences3, popularExperiences4, popularExperiences5, popularExperiences6, popularExperiences7, popularExperiences8, popularExperiences9, popularExperiences10} from "../../assets/images";

const PopularExperiencesCarousel = () => {
  const experiences = [
    {
      image: popularExperiences1,
      bgImage: popularExperiences6,
      title: 'Beach & Islands',
      description: 'Relaxing tropical escapes, island hopping, beach resorts'
    },
    {
      image: popularExperiences2,
      bgImage: popularExperiences7,
      title: 'Adventure',
      description: 'Thrill-based trips like trekking, rafting, paragliding, safaris'
    },
    {
      image: popularExperiences3,
      bgImage: popularExperiences8,
      title: 'Family Holidays',
      description: 'Kid-friendly destinations, theme parks, multi-day tours'
    },
    {
      image: popularExperiences4,
      bgImage: popularExperiences9,
      title: 'Cruises',
      description: 'Luxury cruises, river voyages, expedition ships'
    },
    {
      image: popularExperiences5,
      bgImage: popularExperiences10,
      title: 'Wellness',
      description: 'Spa retreats, yoga escapes, meditation centers'
    }
  ];

  return (
    <div className="bg-[radial-gradient(50%_190.38%_at_55.72%_50%,rgba(0,117,149,0.1)_0%,rgba(255,255,255,0.1)_100%)] py-12 lg:py-20">
      <div className="container">
        <div className="mb-8 w-full space-y-4 text-center lg:mb-12">
          <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1.5 text-sm lg:px-4 lg:py-2.5 lg:text-lg/6">
            Popular Experiences
          </span>
          <h2 className="w-full text-2xl font-medium text-black sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
            Browse our <span className="font-playfair italic">top experiences</span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 4, spaceBetween: 32 }
          }}
          className="-mx-2 -my-10 px-2 py-10"
        >
          {experiences.map((exp, idx) => (
            <SwiperSlide key={idx}>
              <div className="group border-gray-light shadow-3xl hover:shadow-4xl relative flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:border-white">
                <div className="absolute inset-0 z-1 opacity-0 duration-300 group-hover:opacity-100">
                  <img src={exp.bgImage} alt={exp.title} className="h-full w-full object-cover" />
                  <span className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></span>
                </div>
                <h3 className="relative z-2 p-4 text-center text-2xl/7 text-black group-hover:text-white lg:p-6 lg:text-[32px]/10.5">
                  {exp.title}
                </h3>
                <div className="mx-auto h-44 shrink-0 lg:h-60">
                  <img src={exp.image} alt={exp.title} className="h-full w-full object-contain" />
                </div>
                <div className="relative z-2 xl:mt-4">
                  <span className="absolute inset-x-0 bottom-0 -z-1 h-48 bg-gradient-to-t mask-[linear-gradient(rgba(0,0,0,0.2),black,black)] opacity-0 backdrop-blur-[5px] duration-300 group-hover:from-black/50 group-hover:from-10% group-hover:opacity-100"></span>
                  <div className="relative z-1 space-y-4 p-4 lg:p-6">
                    <p className="text-gray-dark line-clamp-2 transition group-hover:text-white">
                      {exp.description}
                    </p>
                    <a href="/tours-packages.html" className="btn btn-primary w-full justify-between group-hover:bg-white group-hover:text-black">
                      Explore Packages
                      <MoveUpRight />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default PopularExperiencesCarousel;