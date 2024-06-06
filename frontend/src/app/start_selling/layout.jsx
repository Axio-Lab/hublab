"use client";
import React, { useEffect, cloneElement } from "react";
import { Button } from "@/components";
import { useSearchParams, permanentRedirect, redirect } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/Logo.svg";
import Link from 'next/link';
import campaignBanner from "../../assets/campaignBanner.svg"
import { useAccount } from "@particle-network/connect-react-ui";
import WalletLogin from "@/components/walletLogin";
import LogoutButton from "@/components/logout";
import {useDispatch} from 'react-redux'
import { setUserId } from "@/store/slices/statesSlice";


const layout = ({ children }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const account = useAccount();
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(setUserId(account))
  },[account])

  return (
    <div className="relative">
      <div className="bg-primary flex justify-between items-center px-5 py-3">
      <Link href="/dashboard">
        <Image src={logo} alt="Verxio Logo" className="w-[50px]" />
    </Link>
        <div className="flex items-center gap-3">
          {/* <Button name="start earning" /> */}
          {account ? <LogoutButton /> : <WalletLogin />}
          {/* <WalletLogin/> */}
        </div>
      </div>
      <div 
      className="px-10 py-8 relativ">
        <div className="flex flex-col gap-10 justify-center items-center border rounded-lg  py-6 mb-10 "
          style={{
            backgroundImage: `url(${campaignBanner.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h2 className="text-4xl text-white font-extrabold">
            CREATE PRODUCT
          </h2>
          <div className="flex gap-10 items-center justify-center">
            <Button
              name="start"
              href="/start_selling?tab=start"
              className={`${
                tab === "start" ? "bg-white text-primary" : "bg-transparent"
              } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
              shade={
                tab === "start" &&
                "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
              }
            />
            <Button
              name="details"
              href="/start_selling?tab=details"
              className={`${
                tab === "details"
                  ? "bg-white text-primary"
                  : "bg-transparent border-red-500"
              } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
              shade={
                tab === "inputs" &&
                "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
              }
            />
            <Button
              name="Summary"
              href="/start_selling?tab=summary"
              className={`${
                tab === "summary"
                  ? "bg-white text-primary"
                  : "bg-transparent border-red-500"
              }  py-1 border border-white rounded-[10px] text-[24px]`}
              shade={
                tab === "rewards" &&
                "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
              }
            />
          </div>
        </div>
        <div className="border rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
