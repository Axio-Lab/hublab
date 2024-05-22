"use client";
import { useState } from "react";
import { Table, TableBody } from "./table";
import ColectionIcon from "../../assets/collectionPlusIcon.svg";
import Image from "next/image";
import Link from "next/link";

const CampaignTable = () => {
  const [campaignData] = useState([
    {
      id: 1,
      name: "Ultimate Speed Lexi",
      participants: 9734,
      link: "https://www.",
      page: "campaignpreview",
      reward: "NFT Badge",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Ultimate Speed Lexi",
      participants: 9734,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Token",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Ultimate Speed Lexi",
      participants: 9734,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Soulbound NFT",
      status: "closed",
    },
    {
      id: 4,
      name: "Ultimate Speed Lexi",
      participants: 9734,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Soulbound Token",
      status: "deleted",
    },
  ]);

  return (
    <section className="w-full gap-6 shadow px-2 md:px-5 py-[18px] rounded-[14px]">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-primary font-semibold text-[20px]">Collections</h2>

        <Link href={"dashboard/createcollection"} className="mr relative">
          <div className="rounded-lg bg-[#fff] border border-[#00ADEF] h-full w-full absolute left-[4px] top-[6px]"></div>

          <button className="flex items-center relative z-50  gap-4 text-[#fff] bg-[#00ADEF] px-4 py-2 rounded-lg border border-[#00ADEF]">
            Create Collection
            <Image
              src={ColectionIcon}
              alt="Axios Logo"
              width={20}
              height={20}
            />
          </button>
        </Link>
      </div>
      <div className="flex max-w-full overflow-x-auto w-full">
        <Table
          tableHeads={["All Assets", "Assets Status", "Date", "Assets Type"]}
        >
          <TableBody tableData={campaignData} />
        </Table>
      </div>
    </section>
  );
};

export default CampaignTable;
