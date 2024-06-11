"use client";
import { Button } from "@/components";

const ProjectCollectionModal = () => {
  return (
    <div className="bg-[#000]/40 absolute w-full h-screen overflow-hidden top-0 left-0 z-50 flex justify-center items-center px-28">
      <div className="bg-white flex flex-col items-center gap-5 relative p-8 text-center rounded-lg">
        <h2 className="font-semibold text-[32px] text-[#484851] ">
          Successful
        </h2>
        <p clasName="text-[16px]">
          You have successfully created an NFT collection
        </p>
        <p className="text-[12px]">
          Seamlessly enable on-chain proof of purchase in your product!
        </p>

        <div className="w-full">
          <Button href={"/dashboard"} name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCollectionModal;
