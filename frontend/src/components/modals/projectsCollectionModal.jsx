"use client";
import { CloseCircle } from "iconsax-react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

const ProjectCollectionModal = ({ setOpenCreateModal }) => {

 const router = useRouter();

  const closeModal = () => {
    setOpenCreateModal(false)
    router.push("/dashboard/collections")
  }

  return (
    <div className="bg-[#000]/40 absolute w-full h-screen overflow-hidden top-0 left-0 z-50 flex justify-center items-center px-28">
      <div className="bg-white flex flex-col items-center gap-5 relative p-8 text-center rounded-lg">
        <span
          onClick={() => closeModal() }
          className="absolute top-2 right-4 cursor-pointer"
        >
          <CloseCircle color="#484851" />
        </span>
        <h2 className="font-semibold text-[32px] text-[#484851] ">Successful</h2>
        <p clasName="text-[16px]">You have successfully created your project collection</p>
        <p className="text-[12px]">It’s time to create assets for your collection!</p>

        <div className="w-full">
        <Button 
        href={"/dashboard/collections"}
        name="Continue"  />
        </div>
      </div>
    </div>
  );
};

export default ProjectCollectionModal;
