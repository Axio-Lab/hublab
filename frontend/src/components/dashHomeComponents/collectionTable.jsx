"use client";
import { useState } from "react";
import { Table, TableBody } from "./collectionTableBody";
import ColectionIcon from "../../assets/collectionPlusIcon.svg";
import Image from "next/image";
import Link from "next/link";

const CollectionTable = () => {
  const [campaignData] = useState([
    {
      id: 1,
      name: "PreSale",
      date: "12-05-2024",
      page: "campaignpreview",
      reward: "NFT Badge",
      statusText: "Transferable",
      collectionAddress: "0x0378rtdg4ee",
    },
    {
      id: 2,
      name: "Membership ",
      date: "12-05-2024",
      page: "campaignpreview",
      reward: "Token",
      statusText: "Non Transferable",
      collectionAddress: "0x03786dBD74ee",
    },
    {
      id: 3,
      name: "PreSale",
      date: "12-05-2024",
      page: "campaignpreview",
      reward: "Soulbound NFT",
      statusText: "Transferable",
      collectionAddress: "0x0ff7E15BD74ee",
    },
    {
      id: 4,
      name: "Membership",
      date: "12-05-2024",
      page: "campaignpreview",
      reward: "Soulbound Token",
      statusText: "Non Transferable",
      collectionAddress: "0x03E15BD74ee",
    },
  ]);

  return (
    <section className="w-full gap-6 shadow px-2 md:px-5 py-[18px] rounded-[14px] border">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-primary font-semibold text-[20px]">My Collections</h2>

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
          tableHeads={["Asset Name", "Assets Status", "Date ", "Collection Address"]}
        >
          <TableBody tableData={campaignData} />
        </Table>
      </div>
    </section>
  );
};

export default CollectionTable;
