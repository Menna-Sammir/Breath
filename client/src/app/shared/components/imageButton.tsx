import { Wallpaper } from "lucide-react";

type Props = {
  selected: boolean;
};

export default function imageButton({ selected }: Props) {
  return (
    <div className="relative">
      <button
        aria-label="Star"
        className="relative opacity-80 transition-opacity duration-300 cursor-pointer inline-flex items-center justify-center"
      >
        <Wallpaper className="absolute text-white" size={32} fill="none" />
        <Wallpaper
          className={`relative ${selected ? "text-yellow-400" : "text-gray-500"}`}
          size={28}
          fill={selected ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}
