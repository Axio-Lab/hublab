"use client";
import { Button } from "..";
import Image from "next/image";
import { CloseCircle } from "iconsax-react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useAccount } from "@particle-network/connect-react-ui";
// import React, { useState } from "react";
// import VerxioGold from "../../assets/VerxioCoin.svg";
// import { toast } from "react-toastify";
// import { RiExternalLinkFill } from "react-icons/ri";

const CampaignPreview = ({ setCampaignModalOpen }) => {
  // const dispatch = useDispatch();
  // const start = useSelector((state) => state.generalStates.start);
  const selectedProductImage = useSelector(
    (state) => state.generalStates.selectedProductImage
  );
  const details = useSelector((state) => state.generalStates.details);
  // const summary = useSelector((state) => state.generalStates.summary);
  const userprofile = useSelector((state) => state.generalStates.userProfile);

  // const { selectedProduct } = start;
  const { selectedImage } = selectedProductImage;
  // const { category, productCollectionFile, quantity, proofOfPurchase } =
  //   summary;
  const {
    title,
    description,
    // bannerImg,
    allowPayAnyPrice,
    price,
    discount,
    // customNFT,
  } = details;

  return (
    <>
      <div className="bg-white relative w-full h-full flex flex-col p-6 border rounded-lg overflow-hidden overflow-y-auto border-red-500">
        <div className="w-[100%] border rounded-md p-6 ">
          <span
            onClick={() => setCampaignModalOpen(false)}
            className="absolute top-8 right-8 cursor-pointer"
          >
            <CloseCircle color="#484851" />
          </span>
          <Formik onSubmit={() => {}}>
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-11 w-full">
                <section className="w-full flex items-start gap-4 flex-col md:flex-row">
                  <div className="w-full md:w-[35%]">
                    <div className=" rounded-lg border border-primary border-dashed bg-[#E7E7F9]">
                      <Image
                        src={selectedImage}
                        alt="Product Banner"
                        className="w-full h-full bg-cover"
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>

                  <section className="w-full md:w-[65%] flex items-start flex-col">
                    <div className="w-full flex flex-col mb-4">
                      <p className="font-semibold text-[24px] mb-2">
                        {title ? title : "Product Title was not inputed"}
                      </p>
                      <div className="my-[-10px] flex items-center gap-2">
                        Created by{" "}
                        <span className="font-semibold">
                          {userprofile?.firstName}
                        </span>
                        <span className="font-semibold">
                          {userprofile?.lastName}
                        </span>
                      </div>
                    </div>
                    <section className="flex items-start gap-2 flex-col my-4">
                      <p className="font-semibold text-[24px] capitalize">
                        About the product
                      </p>

                      <p className="text-justify">
                        {description
                          ? description
                          : "Description was not inputed"}
                      </p>
                    </section>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[26px] text-[#00ADEF]">
                        {!allowPayAnyPrice
                          ? `$${price}`
                          : "Customers are alowed to pay any price"}
                      </p>
                      <p className="font-semibold text-[14px]">
                        Holders of the selected NFTs will receive {discount}%
                        discount.
                      </p>
                    </div>

                    <div className="w-full flex flex-col mb-4">
                      <div className="flex items-center gap-2">
                        Quantity:
                        <span className="font-semibold">
                          {quantity === 0 || quantity === undefined
                            ? "Unlimited Product Quantity"
                            : quantity}
                        </span>
                      </div>
                    </div>

                    <p className="text-red-500">
                      NOTE: 1000 BONK cashback on every $1 spent in BONK
                    </p>

                    <section className="w-full md:max-w-xl mx-auto my-8">
                      <Button name={"Buy Now"} className={"bg-green-500"} />
                    </section>
                  </section>
                </section>

                {/* <section className="flex items-center gap-4 flex-col md:flex-row my-4">
                  <div className="w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Selected Product Type
                    </p>
                    <Field
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      readOnly
                      placeholder={
                        selectedProduct
                          ? selectedProduct
                          : "No product type was selected"
                      }
                    />
                  </div>

                  <div className="w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Name of Product
                    </p>
                    <Field
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      readOnly
                      placeholder={title ? title : "Title was not inputed"}
                    />
                  </div>
                </section> */}

                {/* <section className="flex items-center gap-4 flex-col md:flex-row my-4">
                  <div className="w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Sale Price (USD)
                    </p>
                    <div className="mb-5">
                      <Field
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                        placeholder={
                          !allowPayAnyPrice
                            ? price
                            : "Customers are alowed to pay any price"
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Discount Amount (%)
                    </label>
                    <Field
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      placeholder={
                        discount ? discount : "Discount was not inputed"
                      }
                      readOnly
                    />
                    <div className="flex justify-between items-center font-normal text-[16px] mt-2">
                      <p>
                        Holders of the selected NFTs will receive {discount}%
                        discount.
                      </p>
                    </div>
                  </div>
                </section> */}

                {/* <section className="flex items-start gap-4 flex-col md:flex-row my-4">
                  <div className="w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Selected Category
                    </p>
                    <Field
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      placeholder={
                        category ? category : "Category type was not selected"
                      }
                      readOnly
                    />
                  </div>

                  <div className="w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Quantity
                    </p>
                    <Field
                      className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      placeholder={
                        quantity === 0 || quantity === undefined
                          ? "Unlimited Product Quantity"
                          : quantity
                      }
                      readOnly
                    />
                  </div>
                </section> */}

                {/* <section className="flex items-start gap-4 flex-col md:flex-row my-4">
                  <div className="relative z-40 -right-[1px] w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Proof of Purchase
                      (cNFT)
                    </p>
                    <div>
                      <input
                        type="text"
                        name="address"
                        placeholder={
                          proofOfPurchase.address
                            ? proofOfPurchase.address
                            : "Address was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder={
                          proofOfPurchase.name
                            ? proofOfPurchase.name
                            : "Name was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                      />
                      <input
                        type="text"
                        name="imageUrl"
                        placeholder={
                          proofOfPurchase.imageUrl
                            ? proofOfPurchase.imageUrl
                            : "Image Url was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      />
                    </div>
                  </div>

                  <div className="relative z-40 -right-[1px] w-full">
                    <p className="font-semibold text-[24px] mb-5">
                      <span className="mr-3 text-">*</span>Selected Custom NFT
                      (cNFT)
                    </p>
                    <div>
                      <input
                        type="text"
                        name="address"
                        placeholder={
                          customNFT.address
                            ? customNFT.address
                            : "Address was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                      />
                      <input
                        type="text"
                        name="name"
                        placeholder={
                          customNFT.name
                            ? customNFT.name
                            : "Name was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                      />
                      <input
                        type="text"
                        name="imageUrl"
                        placeholder={
                          customNFT.imageUrl
                            ? customNFT.imageUrl
                            : "Image Url was not inputed"
                        }
                        readOnly
                        className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                      />
                    </div>
                  </div>
                </section>

                <section className="flex items-center justify-center mx-auto">
                  <div className="w-full">
                    <div className=" rounded-lg border border-primary border-dashed bg-[#E7E7F9]">
                      <Image
                        src={productCollectionFile}
                        alt="product"
                        className="w-inherit h-inherit bg-cover"
                        width={500}
                        height={200}
                      />
                    </div>
                  </div>
                </section> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CampaignPreview;
