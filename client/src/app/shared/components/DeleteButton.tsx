import { Trash2, Trash } from "lucide-react";

export default function DeleteButton() {
  return (
    <div className="relative">
      <button
        aria-label="Delete"
        className="relative opacity-80 transition-opacity duration-300 cursor-pointer inline-flex items-center justify-center"
      >
        <Trash2 className="absolute w-8 h-8 text-white" size={32} />
        <Trash className="relative w-7 h-7 text-red-600" size={28} />
      </button>
    </div>
  );
}
