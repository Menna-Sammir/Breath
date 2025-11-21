import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOption";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import TopSection from "../dashboard/TopSection";
import { mountainTrip } from "../../../assets/images";

export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(
      activitySchema
    ) as unknown as Resolver<ActivitySchema>,
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: new Date(),
      location: { venue: "", latitude: 0, longitude: 0, city: "" },
      duration: "",
      price: 0,
      departurePlace: { city: "", venue: "" },
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createdActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
        departurePlace: {
          venue: activity.venue || "",
          city: activity.city || "",
        },
        date: new Date(activity.date),
      });
  }, [activity, reset]);

  const onSubmit: SubmitHandler<ActivitySchema> = async (data) => {
    const { location, departurePlace, ...rest } = data;
    const flattenedData = {
      ...rest,
      ...location,
      departurePlace: `${departurePlace.city}, ${departurePlace.venue}`,
    };
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => navigate(`/activities/${activity.id}`),
          }
        );
      } else {
        createdActivity.mutate(flattenedData, {
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingActivity) return <p>Loading activity...</p>;

  return (
    <div className="grow">
      <TopSection
        backgroundImage={mountainTrip}
        title="Discover the Beauty of the Alps"
        subtitle="Unforgettable adventures await — find your perfect journey"
      />

      <div className="relative flex flex-col bg-gray-50 p-0 border border-gray-300 shadow-sm rounded-3xl mt-6 mb-12 mx-8">
        <h2 className="p-6 text-2xl font-semibold text-primary mb-4 bg-gray-200 border-b border-slate-300 rounded-t-3xl  ">
          {activity ? "Edit Activity" : "Create Activity"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6"
        >
          <TextInput label="Retreat Name" control={control} name="title" />

          <TextInput
            label="Description"
            control={control}
            name="description"
            multiline
            rows={3}
          />

          <div className="flex gap-3">
            <SelectInput
              items={categoryOptions}
              label="Category"
              control={control}
              name="category"
            />
            <DateTimeInput label="Date" control={control} name="date" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Duration"
              control={control}
              name="duration"
              placeholder="7 Days 6 Night"
            />

            <TextInput
              label="Price"
              control={control}
              name="price"
              type="number"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LocationInput
              control={control}
              label="Enter travel the location"
              name="location"
            />

            <LocationInput
              control={control}
              label="Enter the departure location"
              name="departurePlace"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={updateActivity.isPending || createdActivity.isPending}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
