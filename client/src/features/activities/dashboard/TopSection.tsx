import { mountainTrip } from "../../../assets/images";

interface HeroSectionProps {
  backgroundImage?: string;
  title: string;
  subtitle?: string;
}

export default function TopSection({
  backgroundImage = mountainTrip,
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundColor: "#8298b4ff",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-gradient-to-b from-[#013248]/70 via-[#013248]/70 to-[#013248]/20" />

      <div className="relative z-20 container pt-24 pb-12 lg:pt-40 lg:pb-20">
        <div className="mb-6 space-y-2 text-center text-white sm:mb-10 lg:mb-16">
          <h1 className="text-[28px]/9 font-medium text-white sm:text-4xl/10 lg:text-5xl/15 xl:text-[56px]/19">
            {title}
          </h1>
          {subtitle && <p className="lg:text-lg/6">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
