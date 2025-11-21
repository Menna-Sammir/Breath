import { useState } from "react";

type RatingProps = {
  maxStars?: number;
  value?: number;
  onChange?: (value: number) => void;
};

export default function Rating({
  maxStars = 5,
  value = 0,
  onChange,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (star: number) => {
    onChange?.(star);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, idx) => {
        const starNumber = idx + 1;

        const isFilled =
          hovered !== null ? starNumber <= hovered : starNumber <= value;

        return (
          <svg
            key={idx}
            onMouseEnter={() => setHovered(starNumber)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(starNumber)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFilled ? "gold" : "none"}
            stroke="gold"
            strokeWidth="2"
            className="w-7 h-7 cursor-pointer transition-all duration-150"
          >
            <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
  );
}
