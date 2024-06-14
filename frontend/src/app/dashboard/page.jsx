"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserDashboardInfo } from "@/store/slices/dashboardSlice";
import Image from "next/image";
import {
  DashboardCards,
  CampaignTable,
  CollectionTable,
} from "@/components/dashHomeComponents";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userDashboardInfo, setUserDashboardInfo] = useState({});
  const [userCollectionInfo, setUserCollectionInfo] = useState([]);
  const [userproductInfo, setUserProductInfo] = useState([]);
  const userId = useSelector((state) => state.generalStates.userId);

  const getAllUserDashboardInfo = async () => {
    try {
      const response = await dispatch(getUserDashboardInfo(userId));
      if (response?.payload?.success === true) {
        setUserDashboardInfo(response?.payload?.dashboardInfo);
      } else if (userId === undefined) {
        toast.info("Connect your wallet to access user dashboard info");
      } else {
        toast.error("Error:: failed to load");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsersCollectionInfo = async () => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/collection/nft/${userId}`;
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

  const getAllUserProductInfo = async () => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/product/${userId}`;
      if (userId === undefined || !userId) {
        toast.info("Connect your wallet to create collection");
      } else {
        const response = await axios.get(url);
        if (response.data.success === true) {
          // toast.success(response.data.message);
          setUserProductInfo(response.data.products);
        }
      }
    } catch (error) {
      console.log("error:", error);
      // toast.error(error);
    }
  };

  useEffect(() => {
    getAllUserDashboardInfo();
  }, []);

  useEffect(() => {
    getAllUsersCollectionInfo();
  }, []);

  useEffect(() => {
    getAllUserProductInfo()
  }, []);

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

  const transformDashboardData = (userDashboardInfo) => {
    return [
      {
        headerText: "All Product",
        number: userDashboardInfo.allProducts,
        src: "/images/allCampaigns.svg",
        alt: "allCampaign",
      },
      {
        headerText: "Total Sales",
        number: userDashboardInfo.totalSales
          ? parseFloat(userDashboardInfo.totalSales).toLocaleString()
          : "0",
        src: "/images/allParticipants.svg",
        alt: "allParticipants",
      },
      {
        headerText: "Total Revenue",
        number: userDashboardInfo.totalRevenue
          ? `$${parseFloat(userDashboardInfo.totalRevenue.toFixed(2)).toLocaleString()}`
          : "$0.00",
        src: "/images/revenueCoin.svg",
        alt: "revenue",
      },
      {
        headerText: "Number of Assets",
        number: userDashboardInfo.numberOfAssets,
        src: "/images/assets.svg",
        alt: "numberofassets",
      },
    ];
  };
  

  const transformedData = transformDashboardData(userDashboardInfo);

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
          {transformedData.map((data, index) => (
            <DashboardCards key={index} {...data} {...colors[index]} />
          ))}
        </section>

        <CollectionTable userCollectionInfo={userCollectionInfo} />
        <CampaignTable userproductInfo={userproductInfo} />
      </section>
    </section>
  );
};

export default Page;
