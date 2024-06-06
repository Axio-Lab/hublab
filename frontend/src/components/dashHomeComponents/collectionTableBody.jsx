"use client";

export const Table = ({ tableHeads, tableData, children }) => {
  return (
    <div className="w-full h-full">
      <table className="w-full border-collapse">
        <thead className="">
          <tr className="w-full text-center  ">
            {tableHeads?.map((head, index) => (
              <th
                className={`text-[#424242] font-semibold text-[16px] bg-[#e1ecf6] border border-[#F3F3FC] py-3 px-4 text-center`}
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
            <CampaignStatusTemplate statusText={data.statusText} />
          </td>
          <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignDateTemplate date={data.date} />
          </td>
          <td className="border border-[#F3F3FC] text-center py-2 px-4">
            <CampaignAsset collectionAddress={data.collectionAddress} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const CampaignNameTemplate = (tableData) => {
  return (
    <p className="font-normal line-clamp-1 text-[16px] text-[#424242]">
      {tableData.name}
    </p>
  );
};

const CampaignStatusTemplate = (tableData) => {
  return (
    <p className="font-normal text-[16px] text-[#424242]">
      {tableData.statusText}
    </p>
  );
};

const CampaignDateTemplate = (tableData) => {
  return (
    <p className="font-normal text-[16px] text-[#424242]">{tableData.date}</p>
  );
};

const CampaignAsset = ({ collectionAddress }) => {
  return (
    <p className="font-normal text-[16px] text-[#424242]">{collectionAddress}</p>
  );
};

// const CampaignAsset = ({ NFT, Token }) => {
//   return (
//     <div className="flex items-center justify-between w-full font-normal text-[16px] text-[#424242]">
//       {NFT ? <p className="mr-2">{NFT}</p> : "-----"}
//       {Token ? <p>{Token}</p> : "----"}
//     </div>
//   );
// };
