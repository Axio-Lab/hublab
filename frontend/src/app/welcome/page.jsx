"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, VideoPlayer } from "@/components";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { useAccount } from "@particle-network/connect-react-ui";
import { getProfile } from "@/store/slices/profileSlice";
import { toast } from "react-toastify";
import {
  setUserId,
  setUserProfile,
  setEdit,
} from "@/store/slices/statesSlice";
import { useSelector, useDispatch } from "react-redux";


const page = () => {
  const router = useRouter();
  const account = useAccount();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.profile.profile.status);

  const getUserProfile = async () => {
    try {
      const response = await dispatch(getProfile({ id: account }));
      if (response.payload.success === true) {
        dispatch(setUserId(account));
        dispatch(setUserProfile(response?.payload.profile));
        router.push("/dashboard");
        toast.success(response?.payload.message);
      } else {
        toast.info("Create a new profile");
        dispatch(setEdit(true));
        dispatch(setUserId(account));
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="w-screen h-screen flex flex-col-reverse md:flex-row items-center">
      <div className="relative w-full h-full min-h-[50%] md:w-1/2">
        <VideoPlayer />
      </div>
      <div className="relative bg-[#F3F3FC] w-full h-full md:w-1/2 min-h-[50%] flex flex-col gap-12 text-center items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-semibold text-primary text-2xl md:text-[48px] leading-snug">
            Hey Champ!
            <Image
              src={"/images/champ.svg"}
              height={100}
              width={100}
              alt="champ"
              className="inline"
            />
            <br />
            We have <br className="hidden md:block" /> been expecting you.
          </h2>
          <p className="font-normal text-primary text-xl leading-snug">
            Step into a world of endless possibilities, connect
            <br className="hidden md:block" /> and get this thing rolling....
          </p>
        </div>
        <ConnectButton />
        {account && (
          <Button
            name="Continue"
            isLoading={status === "loading"}
            className={"px-24"}
            onClick={() => getUserProfile()}
          />
        )}
      </div>
    </section>
  );
};

export default page;

