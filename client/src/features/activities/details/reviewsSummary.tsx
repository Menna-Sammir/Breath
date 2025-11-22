import { Star } from "lucide-react";
import { useReviews } from "../../../lib/hooks/useReviews";
import { useParams } from "react-router";
import {
  Progress,
  ProgressTrack,
  ProgressValue,
} from "../../../app/shared/Ui/progress";

export function ReviewsSummary() {
  const { id } = useParams();
  const { getReviewSummery, isLoading } = useReviews(id);

  if (isLoading) {
    return <div>Loading review summary...</div>;
  }

  if (!getReviewSummery) return <div>No review summary available</div>;

  return (
    <div className="flex items-center gap-4">
      <div className="w-1/3  m-4  bg-blue-50 rounded-lg p-8 text-center space-y-4">
        <div className="text-5xl font-bold text-black">
          {getReviewSummery.averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={24}
              className={
                i < Math.floor(getReviewSummery.averageRating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <div className="text-muted-foreground">
          {getReviewSummery.totalReviews} ratings
        </div>
      </div>
      {/* Rating Distribution */}
      <div className="w-1/2 pt-4 text-left">
        {getReviewSummery.ratingDistribution.map((item) => (
          <div key={item.rating} className="flex items-center gap-2 px-4 mb-2">
            <span className="text-lg font-medium w-4">{item.rating}</span>
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
              <Progress value={item.percentage}>
                <ProgressTrack className="h-4" />
                <ProgressValue className="bg-primary h-4" />
              </Progress>
            </div>

            <span className="text-lg text-muted-foreground text-right">
              {item.count} Reviews
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
