import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

interface MenuItemLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function MenuItemLink({ children, to }: MenuItemLinkProps) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{ color: "inherit", "&.active": { color: "yellow" } }}
    >
      {children}
    </MenuItem>
  );
}
