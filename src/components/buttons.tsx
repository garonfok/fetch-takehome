import classNames from "classnames";
import { ReactNode } from "react";

export const PrimaryAnchor = (props: {
  children: string | ReactNode;
  href: string;
  className?: string;
}) => {
  const { children, href, className } = props;
  return (
    <a
      href={href}
      className={classNames(
        "px-3 py-2 bg-[#300D38] text-white rounded-md hover:bg-[#890075] transition duration-200 ease-in-out",
        className
      )}
    >
      {children}
    </a>
  );
};
