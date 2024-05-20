"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Linkedin from "../../../assets/linkedin-logo.svg";
import Discord from "../../../assets/discord-logo.svg";
import Github from "../../../assets/github-logo.svg";
import XLogo from "../../../assets/X-logo.svg";
import Website from "../../../assets/website-logo.svg";
import EarlyAdopter from "../../../assets/EarlyBadge.svg";
import Completionist from "../../../assets/Completionist.svg";
import Milestone from "../../../assets/milestone.svg";
import Expert from "../../../assets/Expert.svg";
import BulletPoint from "../../../assets/bullet-point.svg";
import Points from "@/components/points";
import Badges from "@/components/badges";
import Referralmodal from "@/components/modals/referalmodal";
import EditProfile from "@/components/profileComponents/editProfile";
import Referral from "@/components/profileComponents/referral";
import { setUserProfile, setEdit } from "@/store/slices/statesSlice";
import { claim, getProfile } from "@/store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateAvatarUrl } from "@/utils/verxioAvatar";
import { useAccount } from "@particle-network/connect-react-ui";
import { root } from "@/store/store";
import Link from "next/link";
import mintVerxioTokens from "@/utils/claimVerxioToken";
import { RiExternalLinkFill } from "react-icons/ri";
import getBalance from "@/utils/getVerxioBalance";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [transactionUrl, setTransactionUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const account = useAccount();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.generalStates.userProfile);
  const edit = useSelector((state) => state.generalStates.edit);
  const userId = useSelector((state) => state.generalStates.userId);

  useEffect(() => {
    if (userId !== undefined) {
      getBalance(userId)
        .then((newBalance) => setBalance(newBalance))
        .catch((error) => console.error("Error fetching balance:", error));
    }
  }, [userId, balance]);

  const handleClaimRewards = async () => {
    const totalPoints = userProfile?.points?.totalPoints || 0;
    if (totalPoints > 0) {
      setLoading(true);
      try {
        const destinationAddress = userId;
        const claimAmount = totalPoints;
        const url = await mintVerxioTokens(destinationAddress, claimAmount);
        setTransactionUrl(url);
        await dispatch(claim({ id: userId }));
        setLoading(false);
        getUserProfile();
        toast.success(`${claimAmount} Verxio soulbound token claimed 🎊`);
      } catch (error) {
        toast.error("Error claiming rewards:");
        console.log("Error claiming rewards:", error);
      }
    }
  };

  useEffect(() => {
    // getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await dispatch(getProfile({ id: userId }));
      if (response.payload.success === true) {
        toast.success(response?.payload.message);
        dispatch(setUserProfile(response?.payload?.profile));
      } else {
        toast.info("Create a profile");
        dispatch(setEdit(true));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const socialAccounts =
    userProfile && userProfile.socials
      ? Object.keys(userProfile.socials).map((item) => item)
      : [];

  const socials = userProfile?.socials || {};

  const nonEmptySocials = Object.entries(socials)
    .filter(([key, value]) => value.trim() !== "")
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  const logo = (value) => {
    if (value === "twitter") {
      return XLogo;
    } else if (value === "linkedIn") {
      return Linkedin;
    } else if (value === "discord") {
      return Discord;
    } else if (value === "gitHub") {
      return Github;
    } else if (value === "website") {
      return Website;
    }
  };

  return (
    <>
      <div className="border m-3 sm:m-7 flex rounded-xl ">
        <div className=" border-r w-[100%] sm:w-[70%] p-3 sm:p-5">
          <div className="flex justify-between items-center mb-6 mt-1">
            <h2 className="text-[23px] sm:text-[28px] font-semibold text-[#0D0E32]">
              My Profile
            </h2>
            {edit ? (
              <Button
                name="cancel"
                outline
                onClick={() => dispatch(setEdit(false))}
                className="text-[12px] sm:text-[14px]"
              />
            ) : (
              <Button
                name="Edit Profile"
                outline
                onClick={() => dispatch(setEdit(true))}
                className="text-[12px] sm:text-[14px]"
              />
            )}
          </div>

          {!edit ? (
            <>
              <div className="relative">
                <div className="flex text-center border border-[#222482] rounded-lg relative z-50 bg-white hover:top-2 hover:left-[7px]">
                  <div className="border-r w-[50%] p-5 flex flex-col justify-end">
                    <div className="flex relative justify-center ">
                      <div className="w-[90px] h-[90px]  sm:w-[115px] sm:h-[115px] rounded-full">
                        {/* {!selectedImage && ( */}
                        <img
                          src={generateAvatarUrl(userId)}
                          alt="profile picture"
                          // width={200}
                          // height={200}
                          className="w-full h-full rounded-full bg-cover"
                        />
                        {/* )} */}
                      </div>
                    </div>
                    <p className="text-[13px] font-semibold capitalize">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </p>
                    <p className="text-[12px] font-normal max-sm:truncate">
                      {userProfile?.email}
                    </p>
                  </div>
                  <div className="text-center w-[50%] p-5 flex flex-col justify-center items-center">
                    <p className="text-[16px] font-semibold mb-2">INTERESTS</p>
                    <ul className="text-[13px] font-normal flex flex-col  items-start gap-1">
                      {userProfile?.interests?.map((items, index) => (
                        <div key={index} className="flex items-center  gap-2">
                          <Image
                            alt="bullet point"
                            src={BulletPoint}
                            className="-[16px]"
                          />
                          <li className="top-1">{items}</li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#222482] p-[18px] absolute w-full top-[4px] left-[3px] h-full m-1 "></div>
              </div>
              <div className="mt-10">
                <p className="font-normal text-[20px] mb-2 text-[#0D0E32]">
                  Bio
                </p>
                <p className="border rounded-lg p-3 text-[#757575] text-[16px] border-[#222482] shadow-md">
                  {userProfile?.bio}
                </p>
              </div>

              <div className="w-[100%] p-5 sm:hidden">
                <Points balance2={balance?.toLocaleString()} />
                {/* {balance && <Points balance2={balance?.toLocaleString()} />} */}
                <div className="flex justify-between items-center p-4 border rounded-xl border-[#222482] mt-6">
                  <div className=" w-[50%]">
                    <p className="text-[11px] xl:text-[14px]">
                      Accumulated Points
                    </p>
                    <div className="flex justify-start">
                      <p className="font-semibold text-[16px] md:text-[20px]">
                        {userProfile?.points?.totalPoints}
                      </p>
                    </div>
                  </div>
                  <Button
                    name="claim rewards"
                    outline
                    className="px-[8px] text-[9px] xl:text-[14px]"
                    onClick={handleClaimRewards}
                    isLoading={loading}
                    disabled={userProfile?.points?.totalPoints <= 0}
                  />
                </div>
                <h2 className="text-[28px] font-semibold text-[#0D0E32] mb-3 mt-9">
                  Badges
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8  justify-center items-center">
                  <Badges img={EarlyAdopter} />
                  <Badges img={Completionist} />
                  <Badges img={Milestone} />
                  <Badges img={Expert} />
                </div>

                {edit && (
                  <>
                    <h2 className="text-[28px] font-semibold text-[#0D0E32] mb-3 mt-10">
                      Referal
                    </h2>
                    <Referral
                      setModalOpen={setModalOpen}
                      referalPoints={userProfile?.points?.referalPoints}
                    />
                  </>
                )}
              </div>

              {!edit && (
                <div className="mt-10">
                  <p className="font-normal text-[20px] mb-2 text-[#0D0E32]">
                    Referral
                  </p>
                  <Referral
                    setModalOpen={setModalOpen}
                    referalPoints={userProfile?.points?.referalPoints}
                  />
                </div>
              )}

              <div className="mt-10">
                <p className="font-normal text-[20px] mb-2 text-[#0D0E32]">
                  Socials
                </p>

                <div className="flex gap-3">
                  {Object.entries(nonEmptySocials).map(
                    ([key, value], index) => (
                      <Link
                        key={index}
                        className="flex gap-6 cursor-pointer"
                        href={`${value}`}
                        target="_blank"
                      >
                        <Image
                          alt="logo"
                          src={logo(key)}
                          className="w-[40px] hover:scale-110"
                        />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <EditProfile setEdit={setEdit} getUserProfile={getUserProfile} />
          )}
        </div>
        <div className="w-[40%] p-5 hidden sm:block">
          <Points balance2={balance?.toLocaleString()} />
          {/* {balance && <Points balance2={balance?.toLocaleString()} />} */}

          <div className="flex justify-between items-center p-4 border rounded-xl border-[#222482] mt-6">
            <div className=" w-[50%]">
              <p className="text-[11px] xl:text-[14px]">Accumulated Points</p>
              <div className="flex justify-start">
                <p className="font-semibold text-[16px] md:text-[20px]">
                  {userProfile?.points?.totalPoints}
                </p>
              </div>
            </div>
            <Button
              name="claim rewards"
              outline
              onClick={handleClaimRewards}
              isLoading={loading}
              disabled={userProfile?.points?.totalPoints <= 0}
              className="px-[8px] text-[9px] xl:text-[14px]"
            />
          </div>
          {transactionUrl && (
            <p>
              <a
                href={transactionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                View Transaction{" "}
                <span className="text-red-500">
                  <RiExternalLinkFill />
                </span>
              </a>
            </p>
          )}
          <h2 className="text-[28px] font-semibold text-[#0D0E32] mb-3 mt-9">
            Badges
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8  justify-center items-center">
            <Badges img={EarlyAdopter} />
            <Badges img={Completionist} />
            <Badges img={Milestone} />
            <Badges img={Expert} />
          </div>

          {edit && (
            <>
              <h2 className="text-[28px] font-semibold text-[#0D0E32] mb-3 mt-10">
                Referal
              </h2>
              <Referral
                setModalOpen={setModalOpen}
                referalPoints={userProfile?.points?.referalPoints}
              />
            </>
          )}
        </div>
      </div>
      {modalOpen && (
        <Referralmodal
          setModalOpen={setModalOpen}
          referralCode={userProfile?.referralCode}
        />
      )}
    </>
  );
};

export default Page;
