import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Plus, LogOut, Key, User } from "lucide-react";
import { useAccount } from "../../lib/hooks/useAccounts";

export default function UserMenu() {
  const { currentUser, logoutUser } = useAccount();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => setOpen((s) => !s);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-lg text-gray-800 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        {currentUser?.imageUrl ? (
          <img
            src={currentUser.imageUrl}
            alt="current user"
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
            {currentUser?.displayName?.[0]?.toUpperCase()}
          </div>
        )}
        <span>{currentUser?.displayName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <Link to="/createActivity" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleClose}>
              <Plus size={18} />
              <span>Create Activity</span>
            </Link>

            <Link to={`/profiles/${currentUser?.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleClose}>
              <User size={18} />
              <span>My profile</span>
            </Link>

            <Link to="/change-password" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleClose}>
              <Key size={18} />
              <span>Change password</span>
            </Link>

            <div className="border-t my-1" />

            <button
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                logoutUser.mutate();
                handleClose();
              }}
              role="menuitem"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
