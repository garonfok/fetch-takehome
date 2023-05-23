import { Banner } from "../components/banner";
import { PrimaryAnchor } from "../components/buttons";

const Root = () => {
  return (
    <div className="h-screen flex flex-col">
      <Banner>
        <div className="text-2xl font-bold text-[#300D38]">
          Frontend Take-Home Exercise
        </div>
      </Banner>
      <div className="flex-1 flex-col flex items-center justify-center">
        <PrimaryAnchor
          href="/login"
          className="text-2xl font-medium"
        >
          Log in
        </PrimaryAnchor>
      </div>
    </div>
  );
};

export default Root;
