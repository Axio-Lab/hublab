"use client";
import Image from "next/image";
import { Button } from "@/components";

const page = () => {
  return (
    <section className="w-full h-full p-2 md:p-10 ">
      <section className="w-full border rounded-lg p-2 md:p-6 flex flex-col items-start gap-3">
        <div className="bg-collectionsBg bg-cover bg-center bg-no-repeat w-full min-h-[200px] rounded-lg"></div>

        <section className="relative flex items-center flex-col mt-[-100px] mx-auto gap-6 pb-12 border-b border-gray-500 w-full">
          <div className="bg-[#fff]  rounded-full p-8">
            <Image
              src={"/images/verxioRefer.svg"}
              height={100}
              width={100}
              alt={"Collection Banner"}
              className="rounded-full"
            />
          </div>

          <button className="font-normal text-[##303036] text-[24px] border border-[#303036] px-12 py-2 rounded-lg">
            Membership Badge
          </button>

          <div>
            <Button
              className={"text-[##2D880D] border-[#2D880D] bg-[#E1FBF2]"}
              name={"None Transferable"}
            />
          </div>

          <div className="absolute right-0 top-[95px]">
            <Button name="Edit Collection" className={"px-10"} />
          </div>
        </section>

        <section className="w-full flex items-center justify-between my-4">
          <h3 className="font-medium text-[28px] text-[#303036]">Assets</h3>

          <Button outline name={"Create Asset"} />
        </section>
      </section>
    </section>
  );
};

export default page;
