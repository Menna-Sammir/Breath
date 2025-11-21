import React, { forwardRef } from "react";
import type { LinkProps } from "react-router";
import { Link } from "react-router";

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<LinkProps> & {
    className?: string;
  };

const baseClasses =
  "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors";
const enabledClasses = "bg-indigo-600 text-white hover:bg-indigo-700";
const disabledClasses = "bg-gray-600 text-gray-300 cursor-not-allowed opacity-80";

const StyledButton = forwardRef<HTMLElement, StyledButtonProps>(
  ({ to, className = "", children, disabled, ...rest }, ref) => {
    const classes = `${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`.trim();

    if (to) {
      // Render as a link when `to` is provided
      return (
        <Link to={to as string} ref={ref as any} className={classes} {...(rest as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        className={classes}
        disabled={disabled}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

StyledButton.displayName = "StyledButton";

export default StyledButton;
