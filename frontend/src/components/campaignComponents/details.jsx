"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { setStart } from "@/store/slices/statesSlice";

import Tiptap from "../tiptap";

const Details = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState("");
  const [isCustomAmountAllowed, setIsCustomAmountAllowed] = useState(false);
  const [isCustomNFTEnabled, setIsCustomNFTEnabled] = useState(false);
  const [isNFTDiscountEnabled, setIsNFTDiscountEnabled] = useState(false);
  const [customNFT, setCustomNFT] = useState({ address: "", name: "", imageUrl: "" });
  const [selectedNFT, setSelectedNFT] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);


  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const start = useSelector((state) => state.generalStates.start);

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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleDescriptionChange = (newContent) => {
    setDescription(newContent);
    console.log(newContent);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsCustomAmountAllowed(isChecked);
    if (isChecked) {
      setAmount('');
    }
  };

  const handleAmountChange = (event) => {
    const value = Math.max(0, event.target.value); 
    setAmount(value);
  };

  const handleNFTDiscountChange = (event) => {
    setIsNFTDiscountEnabled(event.target.checked);
    if (!event.target.checked) {
      setSelectedNFT("");
      setDiscount(0);
    }
  };

  const handleNFTChange = (event) => {
    setSelectedNFT(event.target.value);
  };

  const handleDiscountChange = (event) => {
    const value = Math.max(0, Math.min(100, event.target.value));
    setDiscount(value);
  };

  const handleCustomNFTChange = (event) => {
    const { name, value } = event.target;
    setCustomNFT(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCustomNFTEnabledChange = (event) => {
    setIsCustomNFTEnabled(event.target.checked);
  };

  const initialValues = {
    title: start?.title || "",
    description: start?.description || "",
    startDate: start?.startDate || "",
    endDate: start?.endDate || "",
    bannerImg: start?.bannerImg || "",
  };

  return (
    <div className="mt-10 w-[60%] text-[#484851]">
      <Formik onSubmit={() => {}} initialValues={initialValues}>
        {({ isValid, handleSubmit, values, dirty, setFieldValue }) => (
          <Form className="flex flex-col gap-8">
            <div>
              <p className="font-semibold text-[24px] mb-5">
                <span className="mr-3 text-">*</span>Name of Product
              </p>
              <Field
                className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                name="title"
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
                  <p>Your image needs to be at least 300×300 pixels, preferrably a square image.</p>
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

          <div>
            <p className="font-semibold text-[24px] mb-5">
              <span className="mr-3 text-">*</span>Sale Price (USD)
            </p>
            <Field
              className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
              name="amount"
              type="number"
              placeholder={isCustomAmountAllowed ? "Customers will pay any amount" : "Enter product amount"}
              disabled={isCustomAmountAllowed}
              value={amount}
              onChange={handleAmountChange}
            />

          <div className="mb-5">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={isCustomAmountAllowed}
                onChange={handleCheckboxChange}
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
            checked={isNFTDiscountEnabled}
            onChange={handleNFTDiscountChange}
          />
          Enable NFT ownership-based Discounts
        </label>
      </div>

      {isNFTDiscountEnabled && (
        <>
        {!isCustomNFTEnabled && (
          <div className="mb-5">
            <label className="font-semibold text-[24px] mb-5">Select Discount NFT</label>
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
        )}
          <div className="mb-5 mt-10">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={isCustomNFTEnabled}
                onChange={handleCustomNFTEnabledChange}
              />
              Enable Custom NFT Selection
            </label>
            {isCustomNFTEnabled && (
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="NFT Collection Address"
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                  value={customNFT.address}
                  onChange={handleCustomNFTChange}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="NFT Name"
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                  value={customNFT.name}
                  onChange={handleCustomNFTChange}
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="NFT Image URL"
                  className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                  value={customNFT.imageUrl}
                  onChange={handleCustomNFTChange}
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
              value={discount}
              onChange={handleDiscountChange}
            />
            <div className="flex justify-between items-center font-normal text-[16px] mt-2">
            <p>Holders of the selected NFTs will receive {discount}% discount.</p>
          </div>
          </div>
        </>
      )}

        <div>
          
        </div>
            <div className="mt-5">
              <Button
                type="button"
                name="continue"
                className="text-[20px]"
                onClick={() => {
                  console.log(values);
                  dispatch(setStart(values));
                  router.push("/create_campaign?tab=summary");
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