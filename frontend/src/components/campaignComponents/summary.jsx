"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { useAccount } from "@particle-network/connect-react-ui";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import { CloseCircle } from "iconsax-react";
import CampaignSuccess from "../../assets/campaignSuccess.svg";
import CampaignPreview from "../modals/campaignPreview";
import { createProduct } from "@/store/slices/productSlice";
import { setSummary } from "@/store/slices/statesSlice";

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
  // const [showOptions, setShowOptions] = useState(false);
  // const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [campaignId, setCampaignId] = useState("");

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

  const handleQuantityChange = (event, setFieldValue) => {
    const value = Math.max(0, event.target.value);
    setFieldValue("quantity", value);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleNFTChange = (event, setFieldValue) => {
    const newNFT = event.target.value;
    setFieldValue("proofOfPurchase", newNFT);
  };

  const handleCategoryChange = (event, setFieldValue) => {
    const category = event.target.value;
    setFieldValue("category", category);
  };

  const initialValues = {
    quantity: "",
    category: "",
    proofOfPurchase: "",
    bannerImg: "",
  };

  // const userId = useSelector((state) => state.generalStates.userId);

  const user = useAccount();
  const dispatch = useDispatch();

  const type = useSelector(
    (state) => state.generalStates?.start?.selectedProduct
  );
  const title = useSelector((state) => state.generalStates?.details?.title);
  const description = useSelector(
    (state) => state.generalStates?.details?.description
  );
  const allowPayAnyPrice = useSelector(
    (state) => state.generalStates?.details?.allowPayAnyPrice
  );
  const price = useSelector((state) => state.generalStates?.details?.price);
  const isNFTDiscountEnabled = useSelector(
    (state) => state.generalStates?.details?.isNFTDiscountEnabled
  );
  const isCustomNFTEnabled = useSelector(
    (state) => state.generalStates?.details?.isCustomNFTEnabled
  );
  const NFTAddress = useSelector(
    (state) => state.generalStates?.details?.isCustomNFTEnabled.address
  );
  const NFTName = useSelector(
    (state) => state.generalStates?.details?.isCustomNFTEnabled.name
  );
  const NFTImageUrl = useSelector(
    (state) => state.generalStates?.details?.isCustomNFTEnabled.imageUrl
  );

  const createNewProduct = async (values) => {
    try {
      const response = await dispatch(
        createProduct({
          data: {
            type: type,
            name: title,
            image:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcondusiv.com%2Fsequential-io-always-outperforms-random-io-on-hard-disk-drives-or-ssds%2F&psig=AOvVaw0gIZMjG4dtsc3otXxWQgHx&ust=1711935077938000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi7q6KtnYUDFQAAAAAdAAAAABAE",
            description: description,
            payAnyPrice: allowPayAnyPrice,
            price: parseInt(price),
            nftBasedDiscount: isNFTDiscountEnabled,
            enableNftSelection: isCustomNFTEnabled,
            nftSelection: {
              address: NFTAddress,
              name: NFTName,
              imageUrl: NFTImageUrl,
            },
            discountAmount: discount,
            category: parseInt(values.category),
            quantity: values.quantity,
            pop: values.proofOfPurchase,
            purchaseXP: 50,
          },
          // id: 1,
        })
      );
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        setCampaignId(response?.payload?.campaignId);
        console.log(response);
        setModalOpen(true);
        setCampaignModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 3000);
      } else {
        toast.error(response?.payload?.message);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className={`mt-10 w-[60%] text-[#484851] `}>
        <Formik onSubmit={() => {}} initialValues={initialValues}>
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-11">
              <div>
                <div className="mb-5">
                  <p className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Select Category
                  </p>
                  <select
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    value={values.category}
                    onChange={(event) =>
                      handleCategoryChange(event, setFieldValue)
                    }
                  >
                    <option value="">
                      Choose an NFT from your Collection on Verxio
                    </option>
                    <option value="business">Business</option>
                    <option value="collectibles">Collectibless</option>
                    <option value="Spirituality">Spirituality</option>
                    <option value="healthandfitness">Health and Fitness</option>
                    <option value="artsandentertainment">
                      Arts and Entertainment
                    </option>
                    <option value="relationshipandfamily">
                      Relationship and Family{" "}
                    </option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* <div
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
                            setFieldValue("category", items.choice);
                            console.log(
                              values.category,
                              "category Item selected!!!!!"
                            );
                          }}
                          className="w-full bg-white border border-primary rounded-lg p-2 flex flex-col items-start cursor-pointer  hover:shadow-sm hover:border-[3px]"
                        >
                          <h2 className="semibold text-[18px]">{items.name}</h2>
                        </div>
                      ))}
                    </section>
                  )}
                </div> */}
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
                    value={values.quantity}
                    onChange={(event) =>
                      handleQuantityChange(event, setFieldValue)
                    }
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
                    value={values.proofOfPurchase}
                    onChange={(event) => handleNFTChange(event, setFieldValue)}
                  >
                    <option value="">
                      Choose an NFT from your Collection on Verxio
                    </option>
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
                    <span className="text-[32px] font-bold">50</span> points
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
                    <p>
                      To upload multiple files or a bundle, simply compress all
                      the files into a .zip and not .rar file.
                    </p>
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
                    // dispatch(setRewards(values));
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
                      dispatch(setSummary(values));
                      createNewProduct(values);
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
