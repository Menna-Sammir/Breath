import { Star } from "lucide-react";
import { timeAgo } from "../../../lib/utils/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../app/shared/Ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../app/shared/Ui/tooltip";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="pb-6 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-4 mb-4">
        <Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AvatarImage
                  src={review.authorImage || "/placeholder.svg"}
                  alt={review.authorName}
                />
              </TooltipTrigger>

              <TooltipContent>ة
                <p>{review.authorName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AvatarFallback>{review.authorName}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{review.authorName}</h3>
              <p className="text-sm text-muted-foreground">
                {timeAgo(review.createdAt)}
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-foreground mb-4 leading-relaxed">{review.body}</p>
    </div>
  );
}
