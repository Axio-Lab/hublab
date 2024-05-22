"use client";
import { useEffect, useState } from "react";
import { InputOptions, Button } from "..";
import QuestionFormat from "./questionFormat";
import { useRouter } from "next/navigation";

const questionFormatData = [
  {
    headerText: "Digital Product",
    description: 
    "Sell any digital product, including arts, ebooks, downloads, music, courses, collectibles and more, whether hosted on Verxio or external platforms.",
    value:"digitalProduct"
  },
  {
    headerText: "Ticket",
    description:
      "Sell tickets to events, workshops, trainings, webinars and more.",
      value:"ticket"
  },
  {
    headerText: "Service",
    description:
      "Sell any service, including coaching, consultations, counseling, design services, and more.",
      value:"service"
  },
  {
    headerText: "Love Gift",
    description:
      "Allow your audiences to send gifts inform of donations and more.",
      value:"loveGift"
  },
];

const Start = () => {

  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (value) => {
    setSelectedProduct(value);
  };

  return (
    <>
      <section className="w-full space-y-3 mt-10 text-[#484851]">
        <div className="my-3">
          <p className="font-semibold text-[24px]">
            <span className="mr-3 text-">*</span>Select a Product Type
          </p>
        </div>

        <div 
        className="border border-primary rounded-lg p-6 flex flex-col items-cente gap-5">
          {questionFormatData.map((data, index) => (
            <QuestionFormat
              key={`question-number-${index}`}
              {...data}
            />
          ))}
        </div>

        <div className="w-full my-8">
          <Button
            name="Continue"
            className="w-full text-[20px] mt-12"
            onClick={() => {
              router.push("/start_selling?tab=details");
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Start;
