"use client";
import { Button } from "../../../components/Button";
import Image from "next/image";
import { CloseCircle } from "iconsax-react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";

const page = ({ params }) => {
  const selectedProductImage = useSelector(
    (state) => state.generalStates.selectedProductImage
  );
  const details = useSelector((state) => state.generalStates.details);
  const summary = useSelector((state) => state.generalStates.summary);
  const userprofile = useSelector((state) => state.generalStates.userProfile);

  const { quantity } = summary;
  const { selectedImage } = selectedProductImage;
  const { title, description, allowPayAnyPrice, price, discount } = details;

  const proceedToGeneratePaymentLink = async () => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/payment/:productId`;
      if (userId === undefined || !userId) {
        toast.info("Connect your wallet to create collection");
      } else {
        const response = await axios.get(url);
        if (response.data.success === true) {
          // toast.success(response.data.message);
          setUserCollectionInfo(response.data.nfts);
        }
      }
    } catch (error) {
      console.log("error:", error);
      // toast.error(error);
    }
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
          ID: {params?.["[productId"]}
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
                        Description
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: description }}
                        className="flex flex-col gap-2"
                      />
                    </section>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[26px] text-[#00ADEF]">
                        {!allowPayAnyPrice
                          ? `$${price}`
                          : "Customers are alowed to pay any price"}
                      </p>
                      <p className="font-semibold text-[14px]">
                        Holders of this NFT will receive {discount}% discount.
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

                    <p className="font-semibold text-[14px] text-red-500">
                      NOTE: 15,000 $BONK cashback on every $1 spent in BONK
                    </p>

                    <section className="w-full md:max-w-xl mx-auto my-8">
                      <Button
                        name={"Buy Now"}
                        className={"bg-green-500"}
                        onClick={() => {
                          proceedToGeneratePaymentLink();
                        }}
                      />
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

export default page;
