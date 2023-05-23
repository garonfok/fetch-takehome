import Logo from "../assets/fetch/fetch-logo-light.svg";

import { ReactNode } from "react";

export const Banner = (props: { children: string | ReactNode }) => {
  const { children } = props;
  return (
    <nav className="bg-gray-100 flex justify-center">
      <div className="flex justify-between py-4 items-center w-[36rem]">
        <a href="/">
          <img src={Logo} alt="Fetch Rewards Logo" className="h-12" />
        </a>
        {children}
      </div>
    </nav>
  );
};
