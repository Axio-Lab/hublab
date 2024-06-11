import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Badges = ({ img }) => {
  const notify = () =>
    toast.info("cNFT Badge claim is not yet live!", { theme: "light" });

  return (
    <div className="relative w-[160px] h-full flex flex-col mx-au" onClick={notify}>
      <div className="relative flex justify-center hover:top-[6px] hover:left-[5px]">
        <Image alt="badge" src={img} className="rounded-lg z-40 relative " />
      </div>
      <div className="rounded-lg border border-[#222482] p-[18px] absolute w-full top-[2px] left-[1px]  h-full m-1 "></div>
    </div>
  );
};

export default Badges;
