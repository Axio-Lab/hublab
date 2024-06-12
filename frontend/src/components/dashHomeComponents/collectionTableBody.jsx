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
      {tableData.length > 0 ? (
        tableData
        .map((data, index) => (
          <tr
            key={`table-data-${index}`}
            className="hover:bg-[#e1ecf6] transition-all duration-500"
          >
            <td className="border border-[#F3F3FC] text-center py-2 line-clamp-1 px-4">
              <CampaignNameTemplate name={data.name} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4">
              <CampaignStatusTemplate statusText={data.transferable} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4">
              <CampaignDateTemplate date={data.createdAt} />
            </td>
            <td className="border border-[#F3F3FC] text-center py-2 px-4">
              <CampaignAsset collectionAddress={data.mintAddress} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="text-center py-4">
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

const CampaignStatusTemplate = ({ transferable }) => {
  return (
    <p className="font-normal text-[16px] text-[#424242]">
      {transferable ? "Transferable" : "Non-Transferable"}
    </p>
  );
};

const CampaignDateTemplate = ({ date }) => {
  return(<p className="font-normal text-[16px] text-[#424242]">{date}</p>);
};

const shortenAddress = (address) => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 5)}....${address.slice(-5)}`;
};

const CampaignAsset = ({ collectionAddress }) => {
  const shortenedAddress = shortenAddress(collectionAddress);
  const url = `https://explorer.solana.com/address/${collectionAddress}?cluster=devnet`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
      {shortenedAddress}
    </a>
  );
};