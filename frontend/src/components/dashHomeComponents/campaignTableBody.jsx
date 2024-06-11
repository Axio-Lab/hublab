"use client";

import { toast } from "react-toastify";

export const Table = ({ tableHeads, tableData, children }) => {
  return (
    <div className="w-full h-full">
      <table className="w-full border-collapse">
        <thead className="">
          <tr className="w-full text-center  ">
            {tableHeads?.map((head, index) => (
              <th
                className={`text-[#424242] bg-[#e1ecf6] font-semibold text-[16px] border border-[#F3F3FC] py-3 px-4 text-center`}
                key={`${head}-${index}`}
              >
                <>{head}</>
              </th>
            ))}
          </tr>
        </thead>
        {tableData && <TableBody tableData={tableData} />}
        {children}
      </table>
    </div>
  );
};

const truncateText = (text, maxLength = 16) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const TableBody = ({ tableData }) => {
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData.map((data, index) => (
          <tr
            key={`table-data-${index}`}
            className="hover:bg-[#e1ecf6] transition-all duration-500"
          >
            <td className="border border-[#F3F3FC] text-center py-2 px-4 w-1/5">
              <CampaignNameTemplate name={truncateText(data.name)} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4 w-1/5">
              <CampaignStatusTemplate type={truncateText(data.type)} />
            </td>

            <td className="border border-[#F3F3FC] text-center py-2 px-4 w-1/5">
              <CampaignParticipantsTemplate sales={data.sales.toLocaleString()} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4 w-1/5">
              <CampaignReward revenue={`$ ${data.revenue.toLocaleString()}`} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4 w-1/5">
              <CampaignLinkId _id={`${data._id.toLocaleString()}`} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center py-4">
            No record found
          </td>
        </tr>
      )}
    </tbody>
  );
};


const CampaignNameTemplate = ({ name }) => {
  return (
    <p className="font-normal line-clamp-1 text-[16px] text-[#424242]">
      {name}
    </p>
  );
};

const CampaignStatusTemplate = ({ type }) => {
  let statusClass = "";
  let statusText = "";

  switch (type) {
    case "digitalProduct":
      statusClass = "text-[#34A90B] border-[#34A90B] bg-[#DAFCDE]";
      statusText = "Digital Product";
      break;
    case "ticket":
      statusClass = "text-[#00ADEF] border-[#00ADEF] bg-[#E0F7FF]";
      statusText = "Ticket";
      break;
    case "service":
      statusClass = "text-[#3D41CC] border-[#3D41CC] bg-[#DFDFF7]";
      statusText = "Service";
      break;
    case "loveGift":
      statusClass = "text-[#EF00AD] border-[#EF00AD] bg-[#FFD6F4]";
      statusText = "Love Gift";
      break;
    default:
      break;
  }

  return (
    <button
      className={`w-full py-2 px-6 rounded-lg border font-normal text-[14px] ${statusClass}`}
    >
      {statusText}
    </button>
  );
};

const CampaignParticipantsTemplate = ({ sales }) => {
  return <p className="font-normal text-[16px] text-[#424242]">{sales}</p>;
};
const CampaignReward = ({ revenue }) => {
  return <p className="font-normal text-[16px] text-[#424242]">{revenue}</p>;
};

const shortenProductURL = (url) => {
  if (url.length <= 10) return address;
  return `${url.slice(0, 12)}....${url.slice(-5)}`;
};


const CampaignLinkId = ({ _id }) => {
  const url = `product/${_id}`;
  const productURL = shortenProductURL(url);

  const handleCopyLink = () => {
    const url = `https://verxio.xyz/product/${_id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.info("Link copied 🔗 ");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <p
      className="font-normal text-blue-500 border border-[#00ADEF] py-2 px-6 rounded-md cursor-pointer"
      onClick={handleCopyLink}
    >
      {productURL}
    </p>
  );
};
