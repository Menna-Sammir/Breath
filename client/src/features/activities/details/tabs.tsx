import { useState } from "react";
import { MapPin, LayoutGrid, ImageIcon, Star, Calendar } from "lucide-react";

export default function Tabs({
  onTabChange,
}: {
  onTabChange?: (tabId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    { id: "summary", label: "Summary", icon: LayoutGrid },
    { id: "itinerary", label: "Itinerary", icon: Calendar },
    { id: "location", label: "Location", icon: MapPin },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-3">
      <div className="flex gap-4 overflow-x-auto py-6 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`nav-links flex items-center gap-2 px-4 py-3 rounded-full transition font-medium whitespace-nowrap ${
                isActive
                  ? "bg-[#007595] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
