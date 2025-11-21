import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";

interface FilterState {
  destination: string;
  priceRange: [number, number];
  rating: number;
  categories: string[];
  experiences: string[];
}

const FiltersSidebar = observer(function FiltersSidebar() {
  const {
    activityStore: {
      setCity,
      city,
      setMinPrice,
      setMaxPrice,
      minPrice,
      maxPrice,
      setStartDate,
      startDate,
      filter,
      setFilter,
    },
  } = useStore();

  const [filters, setFilters] = useState<FilterState>({
    destination: city ?? "",
    priceRange: [minPrice ?? 0, maxPrice ?? 5000],
    rating: 0,
    categories: [],
    experiences: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    destination: true,
    priceRange: true,
    rating: false,
    category: false,
    experiences: false,
    departure: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const destinations = [
    "Bali",
    "Tokyo",
    "Egypt",
    "Switzerland",
    "Maldives",
    "Morocco",
    "Paris",
    "New York",
  ];

  const experienceOptions = ["all", "isGoing", "isHost"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
        <button className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold">
          Reset
        </button>
      </div>

      {/* Destination Filter */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("destination")}
          className="flex items-center justify-between w-full mb-3 hover:text-cyan-600 transition"
        >
          <span className="font-semibold text-slate-900">Destination</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.destination ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.destination && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search destinations"
              name="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setFilters((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="space-y-2 mt-3">
              {destinations.map((dest) => (
                <label
                  key={dest}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="city"
                    checked={city === dest}
                    onChange={() => {
                      setCity(dest);
                      setFilters((prev) => ({ ...prev, destination: dest }));
                    }}
                    value={dest}
                    className="rounded text-cyan-600"
                  />
                  <span className="text-sm text-gray-700">{dest}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("priceRange")}
          className="flex items-center justify-between w-full mb-3 hover:text-cyan-600 transition"
        >
          <span className="font-semibold text-slate-900">Price Range</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.priceRange ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.priceRange && (
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const max = Number.parseInt(e.target.value) || 0;
                setMaxPrice(max);
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], max],
                }));
              }}
              className="w-full"
            />
            <div className="flex gap-2 text-sm">
              <input
                type="number"
                value={filters.priceRange[0]}
                placeholder="Min"
                onChange={(e) => {
                  const min = Number.parseInt(e.target.value) || 0;
                  setMinPrice(min);
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [min, prev.priceRange[1]],
                  }));
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                placeholder="Max"
                onChange={(e) => {
                  const max = Number.parseInt(e.target.value) || 5000;
                  setMaxPrice(max);
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], max],
                  }));
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              />
            </div>
          </div>
        )}
      </div>

      {/* Ratings Filter */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full mb-3 hover:text-cyan-600 transition"
        >
          <span className="font-semibold text-slate-900">Ratings</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.rating ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input type="checkbox" className="rounded text-cyan-600" />
                <span className="text-sm text-gray-700">
                  {"⭐".repeat(rating)} & above
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Experiences Filter */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("experiences")}
          className="flex items-center justify-between w-full mb-3 hover:text-cyan-600 transition"
        >
          <span className="font-semibold text-slate-900">Experiences</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.experiences ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.experiences && (
          <div className="space-y-2">
            {experienceOptions.map((exp) => (
              <label
                key={exp}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded text-cyan-600"
                  name="filter"
                  value={exp}
                  checked={filter === exp}
                  onChange={() => {
                    setFilter(exp);
                  }}
                />
                <span className="text-sm text-gray-700">{exp}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Departure Dates */}
      <div>
        <button
          onClick={() => toggleSection("departure")}
          className="flex items-center justify-between w-full mb-3 hover:text-cyan-600 transition"
        >
          <span className="font-semibold text-slate-900">departure dates</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.departure ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.departure && (
          <DayPicker
            mode="single"
            selected={startDate as unknown as Date}
            onSelect={(date) => setStartDate(date as Date)}
          />
        )}
      </div>
    </div>
  );
});

export default FiltersSidebar;
