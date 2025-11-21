import { ReviewCard } from "./review-card";
import { useReviews } from "../../../lib/hooks/useReviews";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

const ReviewsList = observer(function ReviewsList() {

  const { id } = useParams();

  const {
    reviewsGroup,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useReviews(id);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="space-y-6">
      {reviewsGroup?.pages.map((reviews) =>
        reviews.items.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
      <div ref={ref} className="h-1" />
      {isFetchingNextPage && <h4>Loading more...</h4>}
      {!reviewsGroup && <h3>No reviews found</h3>}
    </div>
  );

});
export default ReviewsList;
