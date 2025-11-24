import { MoveUpRight } from "lucide-react";
import { dotLine } from "../../assets/images";

export default function TopExperiences() {
  const experiences = [
    {
      id: 1,
      title: "Santorini Sunset Cruise",
      type: "Romantic, Scenic",
      duration: "4 Days · Greece",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Kenya Safari Adventure",
      type: "Wildlife, Luxury",
      duration: "7 Days · Kenya",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Bali Yoga Retreat",
      type: "Wellness, Solo",
      duration: "5 Days · Indonesia",
      image:
        "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Iceland Northern Lights",
      type: "Adventure, Nature",
      duration: "6 Days · Iceland",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
    },
  ];
  return (
    <div className="bg-blue relative overflow-hidden py-12 lg:py-20">
      <img
        src={dotLine}
        alt="dot-line"
        className="absolute bottom-0 left-0 hidden w-20 opacity-50 lg:block xl:w-28 2xl:w-auto"
      />
      <div className="relative container">
        <div className="mb-12 flex flex-col justify-between gap-4 lg:mb-20 xl:flex-row xl:items-end">
          <div className="w-full space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1.5 text-sm text-white lg:px-4 lg:py-2.5 lg:text-lg/6">
              Top Experiences
            </span>
            <h2 className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
              Popular
              <span className="font-playfair italic">
                travel experience packages
              </span>
            </h2>
          </div>
          <p className="w-full max-w-101 text-white lg:text-lg/6">
            Enjoy curated itineraries, transparent pricing, and 24/7 assistance
            from local experts who truly care.
          </p>
        </div>
        <div className="h-auto overflow-x-auto lg:overflow-visible">
          <table className="top-experiences-table w-full border-y border-white/20 text-white xl:text-xl/6.5">
            <tbody>
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="group border-b border-white/10 last:border-b-0"
                >
                  <td className="py-6 pr-4">
                    <span className="font-medium">{exp.title}</span>
                  </td>
                  <td className="py-6 pr-4">
                    <span className="text-white/80">{exp.type}</span>
                  </td>
                  <td className="py-6 pr-4">
                    <span className="text-white/80">{exp.duration}</span>
                  </td>
                  <td className="relative hidden w-full py-6 lg:table-cell">
                    <div className="absolute top-1/2 left-1/2 z-10 h-24 w-40 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:h-40 xl:w-64">
                      <div className="absolute -top-1 -right-2 bottom-1 left-4 -z-10 rounded-xl bg-white/20 xl:rounded-3xl"></div>
                      <div className="h-full w-full -rotate-6 overflow-hidden rounded-xl xl:rounded-3xl">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <button
                      onClick={() => console.log(`Navigate to ${exp.title}`)}
                      className="grid size-8 shrink-0 place-content-center rounded-full bg-white/20 text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
                    >
                      <MoveUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
