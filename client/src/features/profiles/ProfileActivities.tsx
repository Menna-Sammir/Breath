import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { useProfile } from "../../lib/hooks/useProfile.ts";

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, loadingUserActivities } = useProfile(id);

    useEffect(() => {
        setFilter('future')
    }, [setFilter])

    const tabs = [
        { menuItem: 'Future Events', key: 'future' },
        { menuItem: 'Past Events', key: 'past' },
        { menuItem: 'Hosting', key: 'hosting' }
    ];

    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <div>
            <div className="mb-4">
                <nav className="flex gap-2">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabChange(index)}
                            className={`px-3 py-2 rounded ${index === activeTab ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {tab.menuItem}
                        </button>
                    ))}
                </nav>
            </div>

            {(!userActivities || userActivities.length === 0) && !loadingUserActivities ? (
                <p className="mt-2">No activities to show</p>
            ) : null}

            <div className="mt-2" style={{ height: 400, overflow: 'auto' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userActivities && userActivities.map((activity: Activity) => (
                        <div key={activity.id}>
                            <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                                <div className="rounded shadow-md overflow-hidden bg-white">
                                    <img
                                        src={`/images/categoryImages/${activity.category}.jpg`}
                                        alt={activity.title}
                                        className="w-full h-24 object-cover"
                                    />
                                    <div className="p-3 text-center">
                                        <h4 className="text-md font-semibold mb-1 text-gray-800">{activity.title}</h4>
                                        <div className="text-sm text-gray-600">
                                            <div>{format(activity.date, 'do LLL yyyy')}</div>
                                            <div>{format(activity.date, 'h:mm a')}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}