import { Link } from "react-router";
import HeroSection from "./HeroSection";
import { MoveUpRight } from "lucide-react";
import GlobalDestinationsCarousel from "./GlobalDestinationsCarousel";
import ChooseUs from "./ChooseUs";
import TopExperiences from "./TopExpriences";
import FAQSection from "./FAQSection";
import { CTAbanner } from "../../assets/images";

export default function homepage() {
  return (
    <div className="grow">
      <div className="min-h-screen bg-white">
        <HeroSection />
        <GlobalDestinationsCarousel />
        <ChooseUs />
        {/* <PopularExperiencesCarousel /> */}

        {/* Top Packages Section */}
        {/* <TopRatedSection /> */}
        <TopExperiences />
        <FAQSection />

        {/* CTA Section */}
        <div
          className="relative bg-cover bg-center bg-no-repeat py-16 lg:py-[47.5px]"
          style={{ backgroundImage: `url(${CTAbanner})` }}
        >
          <span className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/40"></span>
          <div className="relative container text-center text-white">
            <div className="mb-8 space-y-4 lg:mb-12">
              <h2 className="w-full text-2xl font-medium sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
                Let's Turn{" "}
                <span className="font-playfair italic">Your Dream Trip</span>{" "}
                Into a{" "}
                <span className="font-playfair italic">Real Adventure</span>
              </h2>
              <p className="mx-auto w-full max-w-186 lg:text-lg/6">
                Whether you're planning a solo escape, a romantic getaway, or a
                group expedition — we'll make sure every detail is effortless
                and unforgettable.
              </p>
            </div>
            <Link to="/personalised-trip.html" className="btn">
              Plan My Trip
              <MoveUpRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
