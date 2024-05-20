"use client";
import Link from "next/link";

export const Table = ({ tableHeads, tableData, children }) => {
  return (
    <div className="w-full h-full">
      <table className="w-full border-collapse">
        <thead className="">
          <tr className="w-full text-center  ">
            {tableHeads?.map((head, index) => (
              <th
                className={`text-[#424242] font-semibold text-[16px] border border-[#F3F3FC] py-3 px-4 text-center`}
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

export const TableBody = ({ tableData }) => {
  return (
    <tbody>
      {tableData.map((data, index) => (
        <tr
          key={`table-data-${index}`}
          className="hover:bg-[#e1ecf6] transition-all duration-500"
        >
          <td className="border border-[#F3F3FC] text-center py-2 line-clamp-1 px-4">
            <CampaignNameTemplate name={data.name} />
          </td>
          <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignStatusTemplate status={data.status} />
          </td>
          <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignLinkTemplate
              campaignLink={data.campaignLink}
              link={data.link}
            />
          </td>
          <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignParticipantsTemplate participants={data.participants} />
          </td>
          {/* <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignReward
              Reward={data.Reward}
            />
          </td> */}
        </tr>
      ))}
    </tbody>
  );
};

const CampaignNameTemplate = (tableData) => {
  return (
    <p className="font-normal line-clamp-1 text-[16px] text-[#424242]">{tableData.name}</p>
  );
};

const CampaignStatusTemplate = (tableData) => {
  let statusClass = "";
  let statusText = "";

  switch (tableData.status) {
    case "ongoing":
      statusClass = "text-[#34A90B] border-[#34A90B] bg-[#DAFCDE]";
      statusText = "Ongoing";
      break;
    case "upcoming":
      statusClass = "text-[#00ADEF] border-[#00ADEF] bg-[#E0F7FF]";
      statusText = "Upcoming";
      break;
    case "closed":
      statusClass = "text-[#3D41CC] border-[#3D41CC] bg-[#DFDFF7]";
      statusText = "Closed";
      break;
    case "deleted":
      statusClass = "text-[#EF00AD] border-[#EF00AD] bg-[#FFD6F4]";
      statusText = "Deleted";
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

const CampaignLinkTemplate = (tableData) => {
  return (
    <Link
      href={`/${tableData.page}/${tableData.id}`}
      className="py-2 px-2 rounded-lg cursor-pointer border text-[#00ADEF] border-[#00ADEF] font-normal text-[14px]"
    >
      {tableData.link}
    </Link>
  );
};

const CampaignParticipantsTemplate = (tableData) => {
  return (
    <p className="font-normal text-[16px] text-[#424242]">
      {tableData.status === "closed" ? "---" : tableData.participants}
    </p>
  );
};

