import { NavLink } from "react-router";

interface MenuItemLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function MenuItemLink({ children, to }: MenuItemLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 text-current hover:bg-gray-100 ${
          isActive ? "text-yellow-400" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}
