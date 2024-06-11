"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import  Button  from "../../../components/Button";
import Image from "next/image";
import { formatNumber } from "@/utils/bonkConverter";
import { Formik, Form } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchBonkPrice } from "@/components/fetchBonkPrice";

const page = () => {

  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const productId = pathParts[pathParts.length - 1];

  const [loading, setLoading] = useState(false);
  const [bonkPrice, setBonkPrice] = useState(null);
  const [showUsd, setShowUsd] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  const router = useRouter();

  useEffect(() => {
    const getBonkPrice = async () => {
      const price = await fetchBonkPrice();
      if (price !== null) {
        setBonkPrice(price);
      }
    };
    getBonkPrice();
  }, []);

    useEffect(() => {
      const fetchProductDetail = async () => {
        try {
          const url = `https://backend-verxio.vercel.app/api/v1/product/get/${productId}`;
          const response = await axios.get(url);
          setProductDetail(response.data.product);
        } catch (error) {
          console.log("error:", error);
        }
      };
      fetchProductDetail();
    }, [productId]); 


  const proceedToGeneratePaymentLink = async () => {
    try {
      setLoading(true)
      toast.info('Preparing checkout 🛒')
      const url = `https://backend-verxio.vercel.app/api/v1/payment/${productId}`;
        const response = await axios.get(url);
        const paymentUrl = response.data.payment_url;
        setLoading(false)
        router.push(paymentUrl);
    }
     catch (error) {
      setLoading(false)
      console.log("error:", error);
      toast.error(error);
      
    }
  };

  const handleCheckboxChange = (event) => {
    setShowUsd(event.target.checked);
  };

  const initialValues = {
    productName: "",
    description: "",
    allowPayAnyPrice: productDetail?.allowPayAnyPrice,
    price: "",
    discount: "",
    quantity: ""
  };
  

  return (
    <>
      <div className="bg-white relative w-full h-full flex flex-col p-6 border rounded-lg overflow-hidden overflow-y-auto">
        <div className="w-[100%] border rounded-md p-6 ">
          <span
            onClick={() => setCampaignModalOpen(false)}
            className="absolute top-8 right-8 cursor-pointer"
          >
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
                    <img
                          src={productDetail?.image}
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
                        {productDetail?. name}
                      </p>
                      <div className="my-[-10px] flex items-center gap-2">
                        Created by{" "}
                        <span className="font-semibold">
                          {productDetail.userId?.firstName}
                        </span>
                        <span className="font-semibold">
                          {productDetail.userId?.lastName}
                        </span>
                      </div>
                    </div>
                    <section className="flex items-start gap-2 flex-col my-4">
                      <p className="font-semibold text-[24px] capitalize">
                        Description
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: productDetail?.description }}
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
                          {!productDetail?.allowPayAnyPrice ? (
                            showUsd ? (
                              `$${productDetail?.price}`
                            ) : (
                              `${formatNumber(productDetail?.price / bonkPrice)} $BONK`
                            )
                          ) : (
                            "Customers are allowed to pay any price"
                          )}
                        </p>
                      </div>

                    <div className="w-full flex flex-col mb-4">
                    <p className="font-semibold text-[14px]">
                        Holders of {productDetail.nftSelection?.name} will receive {productDetail?.discountAmount}% discount.
                      </p>
                      <div className="flex items-center gap-2">
                        Quantity:
                        <span className="font-semibold">
                          {productDetail?.quantity === 0
                            ? "unlimited"
                            : productDetail?.quantity}
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
                        isLoading={loading}
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
