import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

import classes from "../Header/header.module.css";

type NavButtonProps = {
  Icon: ReactElement;
  children: React.ReactNode;
  route: string;
  isCurrentLocation: boolean;
};

export default function MobileNavButton({ Icon, children, route, isCurrentLocation }: NavButtonProps) {
  return (
    <Link to={route} className={classes.link}>
      {isCurrentLocation ? (
        <Button variant="filled" className="w-full px-3 py-2 rounded-md font-semibold flex items-center text-white">
          <div className="flex gap-2 items-center">
            {Icon}
            <span className="text-base">{children}</span>
          </div>
        </Button>
      ) : (
        <Button
          variant="white"
          className="w-full px-3 py-2 rounded-md font-semibold flex items-center text-[var(--mantine-color-text)] hover:bg-[#f6f3ff]"
        >
          <div className="flex gap-2 items-center">
            {Icon}
            <span className="text-base text-[var(--mantine-color-dark-6)]" style={{}}>
              {children}
            </span>
          </div>
        </Button>
      )}
    </Link>
  );
}
