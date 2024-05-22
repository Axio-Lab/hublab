"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { useAccount } from "@particle-network/connect-react-ui";
import { setRewards } from "@/store/slices/statesSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import { CloseCircle } from "iconsax-react";
import CampaignSuccess from "../../assets/campaignSuccess.svg";
import { createCampaign } from "@/store/slices/campaignSlice";
import CampaignPreview from "../modals/campaignPreview";

const data = [
  {
    name: "Business",
    choice: "business",
  },
  {
    name: "Collectibles",
    choice: "collectibles",
  },
  {
    name: "Spirituality",
    choice: "spirituality",
  },
  {
    name: "Health and Fitness",
    choice: "healthandfitness",
  },
  {
    name: "Arts and Entertainment",
    choice: "artsandentertainment",
  },
  {
    name: "Relationship and Family",
    choice: "relationshipandfamily",
  },
  {
    name: "Others",
    choice: "others",
  },
];

const Summary = ({ account }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [campaignId, setCampaignId] = useState("");
  const [quantity, setQuantity] = useState(0);

  const title = useSelector((state) => state.generalStates?.start?.title);
  const description = useSelector(
    (state) => state.generalStates?.start?.description
  );
  const startDate = useSelector(
    (state) => state.generalStates?.start?.startDate
  );
  const user = useAccount();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.generalStates.userId);
  const status = useSelector((state) => state.campaign.campaign.status);
  const reward = useSelector((state) => state.generalStates.rewards);


  const fileInputRef = useRef(null);
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    console.log("file", file);
    setFieldValue("bannerImg", file);

    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      const data = reader.readAsDataURL(file);
      console.log(data);
    }
  };
  console.log(selectedImage);
  
  const handleQuantityChange = (event) => {
    const value = Math.max(0, event.target.value);
    setQuantity(value);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleNFTChange = (event) => {
    setSelectedNFT(event.target.value);
  };

  const initialValues = {
    title: title,
    description: description,
  };

 
  return (
    <section>
      <div className={`mt-10 w-[60%] text-[#484851] `}>
        <Formik onSubmit={() => {}} initialValues={initialValues}>
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-11">
              <div>
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Select Category
                </p>

                <div
                  onClick={() => setShowOptions(!showOptions)}
                  className="w-full border border-primary rounded-lg px-5 py-3 flex justify-between items-center gap-3 cursor-pointer relative"
                >
                  <div>
                    <h2 className="semibold text-[18px]">
                      {data[index]?.name}
                    </h2>
                  </div>

                  <span className={"cursor-pointer"}>
                    {showOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                  {showOptions && (
                    <section className="absolute bg-white z-50 w-full top-[70px] left-0 flex flex-col items-center gap-3 rounded-lg p-3 shadow-lg ">
                      {data.map((items, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setIndex(index);
                            setShowOptions(false);
                            setFieldValue("method", items.choice);
                          }}
                          className="w-full bg-white border border-primary rounded-lg p-2 flex flex-col items-start cursor-pointer  hover:shadow-sm hover:border-[3px]"
                        >
                          <h2 className="semibold text-[18px]">{items.name}</h2>
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              </div>

            <div>

            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Quantity
              </p>
              <Field
                className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                name="quantity"
                type="number"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <div className="flex justify-between items-center text-[13px] mt-2">
                  <p>Set quantity to 0 for unlimited products.</p>
                </div>
          </div>
              <div className="relative z-40 -right-[1px]">
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Proof of Purchase (cNFT)
                </p>
              <div className="mb-5">
                <select
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  value={selectedNFT}
                  onChange={handleNFTChange}
                >
                  <option value="">Choose an NFT from your Collection on Verxio</option>
                  <option value="Space NFT">Space NFT</option>
                  <option value="Drips">Drips</option>
                  <option value="Early Badge NFT">Early Badge NFT</option>
                </select>
              </div>
              </div>

              <div>
                <p className="font-semibold text-[24px] mb-5">
                  <span className="mr-3 text-">*</span>Purchase XP
                </p>
                <div className="flex justify-end text-end border rounded-lg border-primary px-16 py-5 text-[#484851] text-[16px] mt-4">
                  <p>
                    Reward Point:{" "}
                    <span className="text-[32px] font-bold">
                      50
                    </span>{" "}
                    points
                  </p>
                </div>
              </div>
              <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Upload Product
              </p>
              <div className="w-[65%]">
                <div className=" rounded-lg border border-primary border-dashed bg-[#E7E7F9]">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt="cover Banner"
                      className="w-full h-full bg-cover"
                      width={500}
                      height={400}
                    />
                  ) : (
                    <div className="mx-28 my-24 border rounded-lg px-2 py-1 border-[#0D0E32] ">
                      <div className="flex items-center gap-2 justify-center">
                        <Image alt="upload" src={UploadIcon} />
                        <button
                          className="text-[14px]"
                          onClick={handleUploadButtonClick}
                        >
                        Drag & Drop your product or Browse
                        </button>
                      </div>
                      <input
                        name="profileImageDoc"
                        type="file"
                        capture="environment"
                        className="hidden"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          handleImageChange(e, setFieldValue);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center text-[13px] mt-2">
                  <p>To upload multiple files or a bundle, simply compress all the files into a .zip and not .rar file.</p>
                  <p>Max 750MB</p>
                </div>
              </div>
            </div>

              <div className="mt-5 flex flex-col gap-8">
                <Button
                  type="button"
                  name="preview"
                  className="font-medium text-[20px] bg-white"
                  outline
                  onClick={() => {
                    setCampaignModalOpen(true);
                    dispatch(setRewards(values));
                  }}
                />
                <Button
                  type="button"
                  name="publish"
                  className="border border-primary font-medium text-[20px]"
                  shade="border-primary"
                  isLoading={status === "loading"}
                  onClick={() => {
                    if (user) {
                      setFieldValue("totalRewardPoint", totalReward);
                      dispatch(setRewards(values));
                      createNewCampaign(values);
                    } else {
                      toast.info("Connect your wallet to publish campaign");
                    }
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {modalOpen && (
        <div
          className={`bg-[#000]/40  absolute w-full h-screen top-0 left-0 z-50 flex justify-center items-center px-28 ${
            modalOpen && "overflow-hidden"
          }`}
        >
          <div className="bg-white p-5 rounded-lg">
            <div className="flex justify-end mb-2">
              <CloseCircle
                size={32}
                onClick={() => {
                  setModalOpen(false);
                }}
                className="cursor-pointer w-7 sm:w-10"
              />
            </div>
            <div className="flex justify-center ">
              <Image
                alt="success"
                src={CampaignSuccess}
                className="w-[250px]"
              />
            </div>

            <p className="text-[20px] text-center">
              You have successfully published your product. Happy Selling!{" "}
            </p>
          </div>
        </div>
      )}

      {campaignModalOpen && (
        <div className="bg-[#000]/40  absolute w-full h-full top-0 left-0 z-50 p-10 text-[#484851] ">
          <CampaignPreview
            campaignId={campaignId}
            setCampaignModalOpen={setCampaignModalOpen}
            reward={reward}
            totalPoints={totalPoints}
            totalReward={totalReward}
          />
        </div>
      )}
    </section>
  );
};

export default Summary;
