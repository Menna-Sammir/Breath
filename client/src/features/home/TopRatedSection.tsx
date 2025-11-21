import React from "react";
import PackageCard from "./PackageCard";
import { packages1, packages2, packages3 } from "../../assets/images";

export default function TopRatedSection() {
  const packages = [
    {
      image: packages1,
      tag: "Family-friendly",
      title: "Bali uncovered",
      rating: "4.9",
      price: "3,799",
      duration: "5 Days / 4 Nights",
      features: [
        "Private overwater villa, snorkeling",
        "All-inclusive island resort",
      ],
      badge: "10% off on bank offers",
      badgeColor: "text-green bg-green/10",
    },
    {
      image: packages2,
      tag: "Cultural Immersion",
      title: "Tokyo & Kyoto Explorer",
      rating: "4.6",
      price: "2,099",
      duration: "7 Days / 6 Nights",
      features: [
        "Sushi-making, bullet train, temples",
        "City hotels + traditional Ryokan",
      ],
      badge: "Easy EMIs",
      badgeColor: "text-green bg-green/10",
    },
    {
      image: packages3,
      tag: "Luxury Retreat",
      title: "Swiss Alps Lakes Getaway",
      rating: "4.7",
      price: "2,299",
      duration: "8 Days / 7 Nights",
      features: [
        "Glacier express train ride",
        "Lakeside chalets, alpine tours",
      ],
      badge: "20% Off",
      badgeColor: "text-red bg-red/10",
    },
  ];

  return (
    <div className="container py-12 lg:py-20">
      <div className="mx-auto mb-8 w-full max-w-155 space-y-4 text-center lg:mb-12">
        <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1.5 text-sm lg:px-4 lg:py-2.5 lg:text-lg/6">
          Top rated packages
        </span>
        <h2 className="w-full text-2xl font-medium text-black sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
          Discover <span className="font-playfair italic">trips</span> tailored
          to how you{" "}
          <span className="font-playfair italic">love to travel.</span>
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 2xl:px-11.5">
        {packages.map((pkg, idx) => (
          <PackageCard tagColor={undefined} key={idx} {...pkg} />
        ))}
      </div>
    </div>
  );
}
