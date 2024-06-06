"use client";
import Image from "next/image";
import { Button } from "@/components";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { setUserId } from "@/store/slices/statesSlice";
import { useAccount } from "@particle-network/connect-react-ui";

const page = () => {

  const account = useAccount();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setUserId(account))
  },[account])

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

        <section clasName="w-full flex items-center gap-4 border border-red-500">
          <div className="flex items-start gap-8 rounded-md">
            <div className="bg-[DFDFF7] h-full w-[200px] ml-4">
              <Image
                src="/images/assetsCoverImage.svg"
                height={100}
                width={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-6">
              <blockquote>
                <h2>Cannos Berge</h2> <button>$B</button>
              </blockquote>
              <p>
                an exclusive NFT featuring a futuristic membership. Owners enjoy
                special privileges within the collection.
              </p>
              <div className="flex items-center justify-between">
                <Button name={"Claim"} />
                <Button outline name={"Edit"} />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-8 rounded-md">
            <div className="h-full bg-[DFDFF7] w-[200px] ml-4">
              <Image
                src="/images/assetsCoverImage.svg"
                height={100}
                width={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-6">
              <blockquote>
                <h2>Cannos Berge</h2> <button>$B</button>
              </blockquote>
              <p>
                an exclusive NFT featuring a futuristic membership. Owners enjoy
                special privileges within the collection.
              </p>
              <div className="flex items-center justify-between">
                <Button name={"Claim"} />
                <Button outline name={"Edit"} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default page;
