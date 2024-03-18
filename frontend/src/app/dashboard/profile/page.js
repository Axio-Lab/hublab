import Button from "@/components/Button";
import React from "react";
import Image from "next/image";
import XLogo from "../../../assets/X-logo.svg";
import Socials from "@/components/socials";
import Points from "@/components/points";

const page = () => {
  return (
    <div className="border m-7 h-screen flex  rounded-xl ">
      <div className=" border-r w-[60%] p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[28px] font-semibold text-[#0D0E32]">
            My Profile
          </h2>
          <Button name="Edit Profile" outline />
        </div>
        <div className="relative">
          <div className="flex text-center border border-[#222482] rounded-lg relative z-50 bg-white">
            <div className="border-r w-[50%] p-5 flex flex-col justify-end">
              <p className="text-[16px] font-semibold">Kiraichi Enioluwa</p>
              <p className="text-[12px] font-normal">
                kirachienioluwa@gmail.com
              </p>
            </div>
            <div className="text-center w-[50%] p-5">
              <p className="text-[16px] font-semibold mb-2">INTERESTS</p>
              <ul className="text-[12px] font-normal">
                <li>Development</li>
                <li>Development</li>
                <li>Development</li>
                <li>Development</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-[#222482] p-[18px] absolute w-full top-[4px] left-[3px] h-full m-1 "></div>
        </div>
        <div className="mt-10">
          <p className="font-normal text-[20px] mb-2 text-[#0D0E32]">Bio</p>
          <p className="border rounded-lg p-3 text-[#757575] text-[16px] border-[#222482] shadow-md">
            Passionate Web3 enthusiast exploring the intersection of blockchain
            technology and community growth
          </p>
        </div>
        <div className="mt-10">
          <p className="font-normal text-[20px] mb-2 text-[#0D0E32]">Social</p>
          <Socials />
          <Socials />
          <Socials />
          <Socials />
          <Socials />
          <Socials />
        </div>
      </div>
      <div className="w-[40%] p-5">
        <Points />
        <div className="flex justify-between items-center p-4 border rounded-xl border-[#222482] mt-6">
          <div className=" w-[60%]">
            <p className="text-[13px]">Accumulated points</p>
            <div className="flex justify-center">
              <p className="font-semibold text-[20px]">11, 6878.568</p>
            </div>
          </div>
          <Button name="claim rewards" outline className="" />
        </div>
      </div>
    </div>
  );
};

export default page;
