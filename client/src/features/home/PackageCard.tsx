import { Check, Heart, MoveUpRight, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type PackageCardProps = {
  image: string;
  tag: string;
  tagColor?: string;
  title: string;
  rating?: number | string;
  price: number | string;
  duration: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
};

const PackageCard = ({
  image,
  tag,
  title,
  rating,
  price,
  duration,
  features,
  badge,
  badgeColor,
}: PackageCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border-gray-light shadow-3xl flex h-full flex-col gap-4 rounded-3xl border bg-white p-4 transition hover:shadow-[0_16px_32px_-12px_rgba(88,92,95,0.1)] xl:gap-6">
      <div className="group relative h-60 overflow-hidden rounded-2xl xl:h-75">
        <Link
          to="/package-details.html"
          className="absolute inset-0 z-1"
        ></Link>
        <img
          src={image}
          alt="package"
          className="h-full w-full object-cover duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="text-primary absolute top-4 left-2.5 z-2 grid size-7 place-content-center rounded-full bg-white lg:left-4 lg:size-8"
        >
          <Heart
            className={`size-5 duration-300 ${liked ? "fill-current" : ""}`}
          />
        </button>
        <span className="absolute top-4 right-2.5 z-2 rounded-full bg-white px-2.5 py-1.5 text-xs/4 text-black lg:right-4 lg:px-4 lg:text-sm/4.5">
          {tag}
        </span>
      </div>

      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="grow space-y-4 xl:space-y-6">
          <div className="space-y-2">
            <span
              className={`inline-block rounded-full px-2.5 py-1.5 text-xs/4 font-semibold lg:px-4 lg:text-sm/4.5 ${badgeColor}`}
            >
              {badge}
            </span>
            <div className="flex items-start justify-between gap-2.5 lg:gap-4">
              <h3 className="block text-xl text-black transition hover:opacity-70 sm:min-h-16 lg:text-2xl/8">
                <Link to="/package-details.html" className="line-clamp-2">
                  {title}
                </Link>
              </h3>
              <span className="bg-gray-light mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm/5 text-black ring-1 ring-black/2 ring-inset lg:text-base/5.5">
                <Star className="text-yellow fill-yellow size-4 shrink-0" />
                {rating}
              </span>
            </div>
            <p className="font-semibold text-black lg:text-xl/6.5">${price}</p>
          </div>
          <div className="space-y-2 text-sm/5 lg:text-base/5.5">
            <div className="flex gap-2">
              <span className="bg-gray mt-[3px] grid size-4 shrink-0 place-content-center rounded-full text-white">
                <Check className="size-2.5" />
              </span>
              <p>{duration}</p>
            </div>
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="bg-gray mt-[3px] grid size-4 shrink-0 place-content-center rounded-full text-white">
                  <Check className="size-2.5" />
                </span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <Link
          to="#"
          className="group/detail text-primary inline-flex w-fit items-center gap-2 font-medium hover:opacity-80 lg:text-lg/6"
        >
          View Details
          <MoveUpRight className="w-0 duration-300 group-hover/detail:size-5" />
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
