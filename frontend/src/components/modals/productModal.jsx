"use client";
import { CloseCircle } from "iconsax-react";
import { Button } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CampaignSuccess from "../../assets/campaignSuccess.svg";

const ProductModal = ({ setOpenModal }) => {
  const router = useRouter();
  return (
    <div className="bg-[#000]/40 absolute w-full h-screen overflow-hidden top-0 left-0 z-50 flex justify-center items-center px-28">
      <div className="bg-white flex flex-col items-center gap-5 relative p-8 text-center rounded-lg">
        <span
          onClick={() => {
            setOpenModal(false);
            router.replace("/dashboard");
          }}
          className="absolute top-2 right-4 cursor-pointer"
        >
          <CloseCircle color="#484851" />
        </span>

        <div className="flex items-center gap-2 mt-2 cursor-pointer">
          <Image
            alt="check icon"
            width={150}
            height={150}
            src={CampaignSuccess}
          />
        </div>
        <h2 className="font-semibold text-[32px] text-[#484851] ">
          Successful
        </h2>
        <p clasName="text-[16px]">
          You have successfully published your product. Happy Selling!{" "}
        </p>

        <div className="w-full">
          <Button
            onClick={() => router.replace("/dashboard")}
            name="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
