"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import UploadIcon from "../../assets/uploadIcon.svg";
import Button from "../Button";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CampaignPreview from "../modals/campaignPreview";
import { createProduct } from "@/store/slices/productSlice";
import { setSummary } from "@/store/slices/statesSlice";
import ProductModal from "@/components/modals/productModal";
// import { useAccount } from "@particle-network/connect-react-ui";

const Summary = ({ account }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fileInputRef = useRef(null);
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    // console.log("file", file);
    setFieldValue("productCollectionFile", file);

    if (file) {
      const reader = new FileReader();
      // console.log("reader", reader);

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

  const handleCategoryChange = (event, setFieldValue) => {
    const category = event.target.value;
    setFieldValue("category", category);
  };

  const handleProofOfPurchaseChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(`proofOfPurchase.${name}`, value);
  };

  const initialValues = {
    category: "",
    quantity: "",
    proofOfPurchase: {
      address: "",
      name: "",
      imageUrl: "",
    },
    productCollectionFile: "",
  };

  // const [showOptions, setShowOptions] = useState(false);
  // const [index, setIndex] = useState(0);
  // const [campaignId, setCampaignId] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  // const user = useAccount();
  // console.log(status, "srajhgfdsdfghjkl;");
  // const status = useSelector((state) => state.product.status);
  // const userId = useSelector((state) => state.generalStates.userId);

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
  const discount = useSelector(
    (state) => state.generalStates?.details?.discount
  );
  const NFTAddress = useSelector(
    (state) => state.generalStates?.details?.customNFT?.address
  );
  const NFTName = useSelector(
    (state) => state.generalStates?.details?.customNFT?.name
  );
  const NFTImageUrl = useSelector(
    (state) => state.generalStates?.details?.customNFT?.imageUrl
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
            nftSelection: {
              address: NFTAddress,
              name: NFTName,
              imageUrl: NFTImageUrl,
            },
            discountAmount: parseInt(discount),
            category: values.category,
            quantity: parseInt(values.quantity),
            unlimitedQuantity: values.quantity === 0 ? true : false,
            pop: {
              address: values.proofOfPurchase.address,
              name: values.proofOfPurchase.name,
              imageUrl: values.proofOfPurchase.imageUrl,
            },
            purchaseXP: 50,
            // product: values.productCollectionFile,
            product:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcondusiv.com%2Fsequential-io-always-outperforms-random-io-on-hard-disk-drives-or-ssds%2F&psig=AOvVaw0gIZMjG4dtsc3otXxWQgHx&ust=1711935077938000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi7q6KtnYUDFQAAAAAdAAAAABAE",
          },
          // id: 1,
        })
      );
      console.log(response);
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        console.log(response.payload);
        setOpenModal(true);
        // setCampaignId(response?.payload?.campaignId);
        // setModalOpen(true);
        // setCampaignModalOpen(true);
        // setTimeout(() => {
        //   setModalOpen(false);
        // }, 3000);
        // console.log(response);
      } else {
        toast.error(response?.payload?.message);
        console.log(response);
      }
    } catch (error) {
      console.error("error:", error);
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
                    <option value="">Select product category</option>
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
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="NFT Collection Address"
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                    value={values?.proofOfPurchase?.address}
                    onChange={(event) =>
                      handleProofOfPurchaseChange(event, setFieldValue)
                    }
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="NFT Name"
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32] mb-3"
                    value={values.proofOfPurchase.name}
                    onChange={(event) =>
                      handleProofOfPurchaseChange(event, setFieldValue)
                    }
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="NFT Image URL"
                    className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
                    value={values.proofOfPurchase.imageUrl}
                    onChange={(event) =>
                      handleProofOfPurchaseChange(event, setFieldValue)
                    }
                  />
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
                    dispatch(setSummary(values));
                  }}
                />
                <Button
                  type="button"
                  name="publish"
                  className="border border-primary font-medium text-[20px]"
                  shade="border-primary"
                  // isLoading={status === "loading" ? <LoadingSpinner /> : name}
                  // isLoading={loading}
                  onClick={() => {
                    // console.log(values);
                    dispatch(setSummary(values));
                    createNewProduct(values);
                    // if (user) {
                    //   setFieldValue("totalRewardPoint", totalReward);
                    //   // dispatch(setSummary(values));
                    //   // createNewProduct(values);

                    // } else {
                    //   toast.info("Connect your wallet to publish campaign");
                    // }
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {openModal && (
        <ProductModal setOpenModal={setOpenModal} openModal={openModal} />
      )}

      {campaignModalOpen && (
        <div className="bg-[#000]/40  absolute w-full h-full top-0 left-0 z-50 p-10 text-[#484851] ">
          <CampaignPreview
            // campaignId={campaignId}
            setCampaignModalOpen={setCampaignModalOpen}
            // reward={reward}
            // totalPoints={totalPoints}
            // totalReward={totalReward}
          />
        </div>
      )}
    </section>
  );
};

export default Summary;
