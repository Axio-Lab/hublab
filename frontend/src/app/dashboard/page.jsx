"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DashboardCards,
  CampaignTable,
  CollectionTable,
} from "@/components/dashHomeComponents";
import { dashboardCardData } from "@/utils/data";

const Page = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.generalStates.userId);

  console.log(userId);

  useEffect(() => {
    if (userId === "") {
      router.push("/welcome");
    }
  }, []);

  const colors = [
    { borderColor: "#3D41CC", backgroundColor: "#DFDFF7" },
    { borderColor: "#EF00AD", backgroundColor: "#FFE0F7" },
    { borderColor: "#ADEF00", backgroundColor: "#F7FFE0" },
    { borderColor: "#00ADEF", backgroundColor: "#E0F7FF" },
  ];

  return (
    <section className="w-full h-full p-2 md:p-10">
      <section className="w-full border rounded-lg p-2 md:p-6 flex flex-col items-start gap-3">
        <h2 className="text-primary font-semibold text-[28px]">Dashboard</h2>

        <section className="flex items-start md:items-center gap-3 flex-wrap">
          <Link
            href={"/start_selling?tab=start"}
            className="border-dashed border-2 border-[#00ADEF] rounded-lg bg-[#E0F7FF] flex flex-col p-10 cursor-pointer items-center justify-center"
          >
            <Image
              src={"/images/createCampaign.svg"}
              height={50}
              width={50}
              alt={"add Button"}
            />
            <h3 className="text-[#424242] font-normal text-[14px]">
              Start Selling
            </h3>
          </Link>
          {dashboardCardData.map((data, index) => (
            <DashboardCards key={index} {...data} {...colors[index]} />
          ))}
        </section>

        <CollectionTable />
        <CampaignTable />
      </section>
    </section>
  );
};

export default Page;
