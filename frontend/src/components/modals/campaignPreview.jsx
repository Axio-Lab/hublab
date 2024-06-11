"use client";
import Button  from "../Button";
import Image from "next/image";
import { CloseCircle } from "iconsax-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { formatNumber } from "@/utils/bonkConverter";
import { fetchBonkPrice } from "../fetchBonkPrice";

const CampaignPreview = ({ setCampaignModalOpen }) => {
  const selectedProductImage = useSelector(
    (state) => state.generalStates.selectedProductImage
  );
  const details = useSelector((state) => state.generalStates.details);
  const summary = useSelector((state) => state.generalStates.summary);
  const userprofile = useSelector((state) => state.generalStates.userProfile);

  const { quantity } = summary;
  const { selectedImage } = selectedProductImage;
  const { title, description, allowPayAnyPrice, price, discount, selectedNFT } = details;

  const [bonkPrice, setBonkPrice] = useState(null);
  const [showUsd, setShowUsd] = useState(false);

  const initialValues = {
    productName: title ? title : "",
    description: description ? description : "",
    allowPayAnyPrice: allowPayAnyPrice ? allowPayAnyPrice : false,
    price: price ? price : 0,
    discount: discount ? discount : 0,
    quantity: quantity ? quantity : 0,
    selectedImage: selectedImage ? selectedImage : "", 
  };
  
  useEffect(() => {
    const getBonkPrice = async () => {
      const price = await fetchBonkPrice();
      if (price !== null) {
        setBonkPrice(price);
      }
    };
    getBonkPrice();
  }, []);

  const handleCheckboxChange = (event) => {
    setShowUsd(event.target.checked);
  };

  return (
    <>
      <div className="bg-white relative w-full h-full flex flex-col p-6 border rounded-lg overflow-hidden overflow-y-auto">
        <div className="w-[100%] border rounded-md p-6 ">
          <span
            onClick={() => setCampaignModalOpen(false)}
            className="absolute top-8 right-8 cursor-pointer"
          >
            <CloseCircle color="#484851" />
          </span>
          <Formik 
          initialValues={initialValues}
          onSubmit={() => {}}
          >
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
                        Description
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: description }}
                        className="flex flex-col gap-2"
                      />
                    </section>
                  <div className="flex items-center mr-2">
                            <input
                              type="checkbox"
                              id="togglePrice"
                              checked={showUsd}
                              onChange={handleCheckboxChange}
                              className="mr-2"
                            />
                            <label htmlFor="togglePrice" className="font-semibold text-[13px]">Show price in USD</label>
                          </div>
                          
                      <div className="flex items-center gap-3">
                          <p className="font-semibold text-[26px] text-[#00ADEF]">
                            {!allowPayAnyPrice ? (
                              showUsd ? (
                                `$${price}`
                              ) : (
                                `${formatNumber(price / bonkPrice)} $BONK`
                              )
                            ) : (
                              "Customers are allowed to pay any price"
                            )}
                          </p>
                        </div>

                    <div className="w-full flex flex-col mb-4">
                    <p className="font-semibold text-[14px]">
                        Holders of {selectedNFT.name} will receive {discount}% discount.
                      </p>
                      <div className="flex items-center gap-2">
                        Quantity:
                        <span className="font-semibold">
                          {quantity === 0 || quantity === undefined
                            ? "unlimited"
                            : quantity}
                        </span>
                      </div>
                    </div>

                    <p className="font-semibold text-[14px] text-red-500">
                      NOTE: 15,000 $BONK cashback on every $1 spent in BONK
                    </p>

                    <section className="w-full md:max-w-xl mx-auto my-8">
                      <Button name={"Buy Now"} className={"bg-green-500"} />
                    </section>
                  </section>
                </section>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CampaignPreview;
