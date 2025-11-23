import { Search } from "lucide-react";
import { Link } from "react-router";
import { background } from "../../assets/images";

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay layer */}
      <div className="from-blue to-blue/20 bg-gradient-to-t absolute inset-0 backdrop-blur-xs z-10"></div>

      {/* Card */}
      <div className="max-w-xl w-full mx-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative z-20">
        <Search className="text-sky-600 mb-4 mx-auto" size={56} />
        <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-700 mb-6">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <Link
          to="/"
          className="inline-block w-full sm:w-auto text-center px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
