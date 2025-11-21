import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import ProfileEdit from "./ProfileEditForm";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">About {profile?.displayName}</h3>
                {isCurrentUser && (
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {editMode ? 'Cancel' : 'Edit profile'}
                    </button>
                )}
            </div>
            <hr className="my-2" />
            <div className="overflow-auto max-h-80">
                {editMode ? (
                    <ProfileEdit setEditMode={setEditMode} />
                ) : (
                    <p className="whitespace-pre-wrap">
                        {profile?.bio || 'No description added yet'}
                    </p>
                )}
            </div>
        </div>
    )
}