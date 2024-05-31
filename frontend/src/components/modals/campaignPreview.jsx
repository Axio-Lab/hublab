"use client";
import React, { useState } from "react";
import { Button } from "..";
import SocialTask from "../campaignComponents/socialTask";
import Image from "next/image";
import VerxioGold from "../../assets/VerxioCoin.svg";
import { CloseCircle } from "iconsax-react";
import PreviewTask from "../campaignComponents/previewTask";
import CampaignLink from "./campainLink";
import { useSelector, useDispatch } from "react-redux";
import { useAccount } from "@particle-network/connect-react-ui";
import mintVerxioTokens from "@/utils/claimVerxioToken";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiExternalLinkFill } from "react-icons/ri";

const CampaignPreview = ({ setCampaignModalOpen }) => {
  // const [totalPointArray, setTotalPointArray] = useState([]);
  // const [transactionUrl, setTransactionUrl] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const user = useAccount();
  // const userId = useSelector((state) => state.generalStates.userId);
  // const status = useSelector((state) => state.campaign.campaign.status);

  // console.log("User Account", user);

  // const addValueToArray = (newValue) => {
  //   // Copy the current array state
  //   const newArray = [...totalPointArray];

  //   // Push the new value into the copied array
  //   newArray.push(newValue);

  //   // Update the state variable 'array' with the modified array
  //   setTotalPointArray(newArray);
  // };

  // console.log(reward);
  // console.log(totalPointArray);

  // const handleClaimRewards = async (total) => {
  //   if (!user) {
  //     toast.info("Please connect your wallet 😒");
  //     return;
  //   }

  //   if (total > 0) {
  //     setLoading(true);
  //     try {
  //       const destinationAddress = user;
  //       const claimAmount = total;
  //       const url = await mintVerxioTokens(destinationAddress, claimAmount);
  //       setTransactionUrl(url);
  //       setLoading(false);
  //       toast.success(`${claimAmount} Verxio soulbound token claimed 🎊`);
  //     } catch (error) {
  //       toast.error("Error claiming rewards:");
  //       console.log("Error claiming rewards:", error);
  //     }
  //   } else {
  //     toast.info("Complete task first 😶‍🌫️");
  //   }
  // };

  // let total = 0;

  // for (let i = 0; i < totalPointArray.length; i++) {
  //   total += totalPointArray[i];
  // }

  // console.log("The total number is:", total);

  const dispatch = useDispatch();

  const start = useSelector((state) => state.generalStates.start);
  const details = useSelector((state) => state.generalStates.details);
  const summary = useSelector((state) => state.generalStates.summary);

  const { selectedProduct } = start;
  const { title, bannerImg, description } = details;
  const {} = summary;

  return (
    <>
      <div className="bg-white w-full h-full flex flex-col p-6 border rounded-lg overflow-hidden">
        <div className="w-[100%] border-r p-6 ">
          <Formik onSubmit={() => {}}>
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-11 w-full md:w-[60%]">
                <div>
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Selected Product Type
                  </p>
                  <Field
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    readOnly
                    placeholder={selectedProduct}
                  />
                </div>

                <div>
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Name of Product
                  </p>
                  <Field
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    readOnly
                    placeholder={title}
                  />
                </div>

                <div className="w-[65%]">
                  <div className=" rounded-lg border border-primary border-dashed bg-[#E7E7F9]">
                    <Image
                      src={bannerImg}
                      alt="cover Banner"
                      className="w-full h-full bg-cover"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Product Description
                  </p>
                  <Field
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    readOnly
                    placeholder={description}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CampaignPreview;
