"use client";
import React from "react";
import Details from "@/components/campaignComponents/details";
import Summary from "@/components/campaignComponents/summary";
import Start from "@/components/campaignComponents/start";
import { useSearchParams } from "next/navigation";

const page = ({account}) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <>
      {tab === "start" && <Start />}
      {tab === "details" && <Details />}
      {tab === "summary" && <Summary/>}
    </>
  );
};

export default page;
