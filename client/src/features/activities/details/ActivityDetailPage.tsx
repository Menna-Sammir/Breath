import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import TripDetails from "./TripDetails";
import TopSection from "../dashboard/TopSection";
import Tabs from "./tabs";
import { useState } from "react";
import LocationDetails from "./LocationDetails";
import { ReviewsSummary } from "./reviewsSummary";
import ReviewsList from "./ReviewsList";
import { AddReviewForm } from "./addReviewForm";
import ActivityPhotos from "./ActivityPhotos";

export default function ActivityDetailPage() {
  const [activeTab, setActiveTab] = useState("summary");

  const { id } = useParams<{ id: string }>();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <div>Loading activity...</div>;

  if (!activity) return <div>Activity not found</div>;

  return (
    <>
      <div className="flex flex-col grow">
        {/* Top Section */}

        <div>
          <TopSection
            backgroundImage={
              `${activity.eventPhotoUrl}` ||
              `/images/categoryImages/${activity.category}.jpg`
            }
            title={activity.title}
            subtitle={`Unforgettable adventures await — Hosted by ${activity?.hostDisplayName}`}
          />
        </div>
        <TripDetails activity={activity} />
        <section className="relative flex flex-col bg-gray-50 p-0 border-gray-300 shadow-sm rounded-3xl mt-6 mb-12 mx-8">
          <div className="bg-gray-200 mb-0 border-b border-slate-300 rounded-t-3xl ">
            <Tabs onTabChange={setActiveTab} />
          </div>

          <div className="p-4">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}

                {activeTab === "summary" && (
                  <div className="lg:col-span-2 space-y-12">
                    {/* Overview */}
                    <ActivityDetailsInfo activity={activity} />
                    <ActivityDetailsChats />
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="lg:col-span-2 space-y-12">
                    {/* Itinerary Content */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Itinerary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Detailed itinerary content goes here...
                    </p>
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="lg:col-span-2 space-y-12">
                    <ActivityPhotos />
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="lg:col-span-2 space-y-12">
                    {/* Reviews Content */}
                    <div className="space-y-12">
                      {/* Reviews Header */}
                      <h1 className="text-3xl font-bold">
                        Our customer reviews
                      </h1>

                      {/* Summary and List Section */}
                      <div className="grid grid-cols-1 gap-8">
                        <div className="lg:col-span-1">
                          <ReviewsSummary />
                        </div>

                        <div className="lg:col-span-2">
                          <ReviewsList />
                        </div>
                      </div>

                      {/* Add Review Form */}
                      <div className="pt-12">
                        <h2 className="text-2xl font-bold mb-6">
                          Share your experience
                        </h2>
                        <AddReviewForm />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <LocationDetails activity={activity} />
                )}

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <ActivityDetailsSidebar activity={activity} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
