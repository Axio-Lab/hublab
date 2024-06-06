"use client";
import { useState } from "react";
import { Table, TableBody } from "./campaignTableBody";
// import ColectionIcon from "../../assets/collectionPlusIcon.svg";
// import Image from "next/image";
// import Link from "next/link";

const CampaignTable = () => {
  const [campaignData] = useState([
    {
      id: 1,
      name: "Social Media Marketing for Meme Coins",
      sales: 80,
      revenue: 1600,
      link: "https://www.",
      page: "campaignpreview",
      reward: "NFT Badge",
      status: "digitalProduct",
    },
    {
      id: 2,
      name: "Token 2049",
      sales: 100,
      revenue: 9700,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Token",
      status: "ticket",
    },
    {
      id: 3,
      name: "1 on 1 Mentorship with Axio Lab",
      revenue: 4000,
      sales: 5,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Soulbound NFT",
      status: "service",
    },
    {
      id: 4,
      name: "Bonk Collectible",
      sales: 12,
      revenue: 1150,
      link: "https://www.",
      page: "campaignpreview",
      reward: "Soulbound Token",
      status: "loveGift",
    },
  ]);

  return (
    <section className="w-full gap-6 shadow px-2 md:px-5 py-[18px] rounded-[14px] mt-10 border">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-primary font-semibold text-[20px]">
          My Products
        </h2>
      </div>
      <div className="flex max-w-full overflow-x-auto w-full">
        <Table
          tableHeads={[
            "Product Name",
            "Type",
            "Product Link",
            "Sales",
            "Revenue",
          ]}
        >
          <TableBody tableData={campaignData} />
        </Table>
      </div>
    </section>
  );
};

export default CampaignTable;
