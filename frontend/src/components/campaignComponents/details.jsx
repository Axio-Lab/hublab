"use client";
import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
// import { getUserCollection } from "@/store/slices/collectionSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetails,
  setSelectedProductImage,
  setUserCollectionNFTOBJ,
} from "@/store/slices/statesSlice";
import Tiptap from "../tiptap";

const Details = () => {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userCollectionNFT, setUserCollectioNFT] = useState([]);
  const userId = useSelector((state) => state.generalStates.userId);


  const getAllUserCollection = async () => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/collection/nft/${userId}`;
      if (userId === undefined || !userId) {
        toast.info("Connect your wallet to get user collection");
      } else {
        const response = await axios.get(url);
        if (response.data.success === true) {
          setUserCollectioNFT(response.data.nfts);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getAllUserCollection();
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const details = useSelector((state) => state.generalStates.details);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    // console.log("file", file);
    setFieldValue("bannerImg", file);

    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      const data = reader.readAsDataURL(file);
      // console.log(data, "file url that is been expected!!!!!");
      // console.log(selectedImage, "image that is been expected!!!!!");
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDescriptionChange = (newContent) => {
    setDescription(newContent);
  };

  const handleCheckboxChange = (event, setFieldValue) => {
    const isChecked = event.target.checked;
    setFieldValue("allowPayAnyPrice", isChecked);
    if (isChecked) {
      setFieldValue("price", "");
    }
  };

  const handleAmountChange = (event, setFieldValue) => {
    const value = Math.max(0, event.target.value);
    setFieldValue("price", value);
  };

  const handleNFTDiscountChange = (event, setFieldValue) => {
    const isChecked = event.target.checked;
    setFieldValue("isNFTDiscountEnabled", isChecked);
    if (!event.target.checked) {
      setFieldValue("selectedNFT", "");
      setFieldValue("discount", 0);
    }
  };

  // const handleNFTChange = (event, setFieldValue) => {
  //   const newNFT = event.target.value;
  //   setFieldValue("selectedNFT", newNFT);
  // };
  const handleNFTChange = (event, setFieldValue) => {
    const selectedNFTId = parseInt(event.target.value);
    const selectedNFT = userCollectionNFT.find(
      (nft) => nft.id === selectedNFTId
    );

    if (selectedNFT) {
      setFieldValue("selectedNFT", {
        address: selectedNFT.mintAddress,
        name: selectedNFT.name,
        imageUrl: selectedNFT.image,
        // collectionId: selectedNFT.id,
      });
    }
  };
  
  const handleDiscountChange = (event, setFieldValue) => {
    const value = Math.max(0, Math.min(100, event.target.value));
    setFieldValue("discount", value);
  };

  const handleCustomNFTChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(`customNFT.${name}`, value);
  };

  const handleCustomNFTEnabledChange = (event, setFieldValue) => {
    const selectedCustomNFT = event.target.checked;
    setFieldValue("isCustomNFTEnabled", selectedCustomNFT);
  };

  const initialValues = {
    title: details?.title || "",
    description: details?.description || "",
    bannerImg: details?.bannerImg || "",
    allowPayAnyPrice: details?.allowPayAnyPrice || false,
    price: details?.price || "",
    isNFTDiscountEnabled: details?.isNFTDiscountEnabled || true,
    isCustomNFTEnabled: details?.isCustomNFTEnabled || false,
    selectedNFT: {
      address: details?.selectedNF?.address || "",
      name: details?.selectedNF?.name || "",
      imageUrl: details?.selectedNF?.imageUrl || "",
    },
    discount: details?.discount || "",
    customNFT: {
      address: details?.customNFT?.address || "",
      name: details?.customNFT?.name || "",
      imageUrl: details?.customNFT?.imageUrl || "",
    },
  };

  return (
    <div className="mt-10 w-[60%] text-[#484851]">
      <Formik onSubmit={() => {}} initialValues={initialValues}>
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-8">
            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Name of Product
              </p>
              <Field
                className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                name="title"
                value={values.title}
                onChange={(event) => {
                  setFieldValue("title", event.target.value);
                }}
                placeholder="Enter name of product"
              />
            </div>
            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Product Image
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
                          Drag & Drop your product images or Browse
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
                    Your image needs to be at least 300×300 pixels, preferrably
                    a square image.
                  </p>
                  <p>Max 24MB</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Product Description
              </p>
              <Tiptap
                onChange={handleDescriptionChange}
                setFieldValue={setFieldValue}
              />
            </div>

            {/* Sale Price */}
            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Sale Price (USD)
              </p>
              <Field
                className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                name="amount"
                type="number"
                placeholder={
                  values.allowPayAnyPrice
                    ? "Customers will pay any amount"
                    : "Enter product amount"
                }
                disabled={values.allowPayAnyPrice}
                value={values.price}
                onChange={(event) => handleAmountChange(event, setFieldValue)}
              />

              <div className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={values.allowPayAnyPrice}
                    onChange={(event) =>
                      handleCheckboxChange(event, setFieldValue)
                    }
                  />
                  Allow customers to pay any amount
                </label>
              </div>
            </div>
            <div className="mb-5 mt-10">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={values.isNFTDiscountEnabled}
                  onChange={(event) =>
                    handleNFTDiscountChange(event, setFieldValue)
                  }
                />
                Enable NFT ownership-based Discounts
              </label>
            </div>

            {values.isNFTDiscountEnabled && (
              <>
                {!values.isCustomNFTEnabled && (
                  <div className="mb-5">
                    <label className="font-semibold text-[24px] mb-5">
                      Select Discount NFT
                    </label>
                    <select
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      value={values.selectedNFT.collectionId}
                      onChange={(event) =>
                        handleNFTChange(event, setFieldValue)
                      }
                    >
                      <option value="">
                        Choose an NFT from your Collection on Verxio
                      </option>
                      {userCollectionNFT.map((collection, index) => (
                        <option key={index} value={collection.id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mb-5 mt-10">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={values.isCustomNFTEnabled}
                      onChange={(event) =>
                        handleCustomNFTEnabledChange(event, setFieldValue)
                      }
                    />
                    Enable Custom NFT Selection
                  </label>
                  {values.isCustomNFTEnabled && (
                    <div>
                      <input
                        type="text"
                        name="address"
                        placeholder="NFT Collection Address"
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                        value={values?.customNFT?.address}
                        onChange={(event) =>
                          handleCustomNFTChange(event, setFieldValue)
                        }
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder="NFT Name"
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                        value={values.customNFT.name}
                        onChange={(event) =>
                          handleCustomNFTChange(event, setFieldValue)
                        }
                      />
                      <input
                        type="text"
                        name="imageUrl"
                        placeholder="NFT Image URL"
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                        value={values.customNFT.imageUrl}
                        onChange={(event) =>
                          handleCustomNFTChange(event, setFieldValue)
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <label className="font-semibold text-[24px] mb-5">
                    <span className="mr-3 text-">*</span>Discount Amount (%)
                  </label>
                  <Field
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    name="discount"
                    type="number"
                    placeholder="Enter discount amount"
                    value={values.discount}
                    onChange={(event) =>
                      handleDiscountChange(event, setFieldValue)
                    }
                  />
                  <div className="flex justify-between items-center font-normal text-[16px] mt-2">
                    <p>
                      Holders of the selected NFTs will receive{" "}
                      {values.discount}% discount.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div></div>
            <div className="mt-5">
              <Button
                type="button"
                name="continue"
                className="text-[20px]"
                onClick={() => {
                  dispatch(setDetails(values));
                  dispatch(setSelectedProductImage({ selectedImage }));
                  dispatch(setUserCollectionNFTOBJ({ userCollectionNFT }));
                  router.push("/start_selling?tab=summary");
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Details;
