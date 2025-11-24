import { Link, useParams } from "react-router";
import { useComments } from "../../../lib/hooks/useComments";
import { timeAgo } from "../../../lib/utils/utils";
import { type FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { MessageCircleDashed } from "lucide-react";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
  const { id } = useParams();
  const { commentStore } = useComments(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const addComment = async (data: FieldValues) => {
    try {
      await commentStore.hubConnection?.invoke("SendComment", {
        activityId: id,
        body: data.body,
        rate: data.rate,
      });

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(addComment)();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center bg-primary text-white py-3 rounded-3xl">
        <h6 className="text-lg font-semibold">
          Chat About this Event{" "}
          <MessageCircleDashed className="inline-block w-6 h-6 ml-2" />
        </h6>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-3">
        {/* Form */}
        <form>
          <textarea
            {...register("body", { required: true })}
            rows={2}
            placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
            onKeyDown={handleKeyPress}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>

          {isSubmitting && (
            <div className="flex justify-end mt-2">
              <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full"></div>
            </div>
          )}
        </form>

        {/* Comments List */}
        <div className="h-96 overflow-auto mt-4">
          {Array.isArray(commentStore.comments) &&
          commentStore.comments.length > 0 ? (
            commentStore.comments.map((comment) => (
              <div key={comment.id} className="flex my-4">
                <img
                  src={comment.imageUrl}
                  alt="user image"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />

                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/profiles/${comment.userId}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {comment.displayName}
                    </Link>

                    <span className="text-sm text-gray-500">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap">{comment.body}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </>
  );
});

export default ActivityDetailsChat;
