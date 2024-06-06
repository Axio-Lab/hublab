"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetails,
  setSelectedProductImage,
} from "@/store/slices/statesSlice";
import Tiptap from "../tiptap";

const Details = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState("");
  // const [customNFT, setCustomNFT] = useState({
  //   address: "",
  //   name: "",
  //   imageUrl: "",
  // });

  const router = useRouter();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const details = useSelector((state) => state.generalStates.details);

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
      console.log(data, "file url that is been expected!!!!!");
      console.log(selectedImage, "image that is been expected!!!!!");
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

  const handleNFTChange = (event, setFieldValue) => {
    const newNFT = event.target.value;
    setFieldValue("selectedNFT", newNFT);
  };

  const handleDiscountChange = (event, setFieldValue) => {
    const value = Math.max(0, Math.min(100, event.target.value));
    setFieldValue("discount", value);
  };

  // const handleCustomNFTChange = (event) => {
  //   const { name, value } = event.target;
  //   setCustomNFT((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleCustomNFTChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(`customNFT.${name}`, value);
    // console.log(value, name, "input value!!!!");
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
    isNFTDiscountEnabled: details?.isNFTDiscountEnabled || false,
    isCustomNFTEnabled: details?.isCustomNFTEnabled || false,
    selectedNFT: details?.selectedNFT || "",
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
        {({ isValid, handleSubmit, dirty, values, setFieldValue }) => (
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
                      value={values.selectedNFT}
                      onChange={(event) =>
                        handleNFTChange(event, setFieldValue)
                      }
                    >
                      <option value="">
                        Choose an NFT from your Collection on Verxio
                      </option>
                      <option value="Space NFT">Space NFT</option>
                      <option value="Drips">Drips</option>
                      <option value="Early Badge NFT">Early Badge NFT</option>
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
