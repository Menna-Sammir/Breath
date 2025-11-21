import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";

export default function ProfilePhotos() {
  const { id } = useParams();
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
    deletePhoto,
  } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  if (loadingPhotos) return <p>Loading photos...</p>;

  if (!photos) return <p>No photos found for this user</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Photos</h3>
        {isCurrentUser && (
          <button
            onClick={() => setEditMode(!editMode)}
            className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 bg-primary/10"
          >
            {editMode ? "Cancel" : "Add photo"}
          </button>
        )}
      </div>

      <hr className="my-2" />

      {editMode ? (
        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploadPhoto.isPending} />
      ) : (
        <>
          {photos.length === 0 ? (
            <p>No photos added yet</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2" style={{ height: 450, overflow: 'auto' }}>
              {photos?.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    srcSet={`${item.url.replace(
                      "/upload/",
                      "/upload/w_94,h_94,c_fill,f_auto,dpr_2,g_face/"
                    )}`}
                    src={`${item.url.replace(
                      "/upload/",
                      "/upload/w_94,h_94,c_fill,f_auto,g_face/"
                    )}`}
                    alt={"user profile image"}
                    loading="lazy"
                    className="w-full object-cover rounded"
                  />
                  {isCurrentUser && (
                    <>
                      <button
                        onClick={() => setMainPhoto.mutate(item)}
                        className="absolute top-1 left-1"
                        aria-label="Set main photo"
                      >
                        <StarButton selected={item.url === profile?.imageUrl} />
                      </button>
                      {profile?.imageUrl !== item.url && (
                        <button
                          onClick={() => deletePhoto.mutate(item.id)}
                          className="absolute top-1 right-1"
                          aria-label="Delete photo"
                        >
                          <DeleteButton />
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
