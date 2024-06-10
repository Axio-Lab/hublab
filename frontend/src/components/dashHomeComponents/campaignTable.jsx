import { Table, TableBody } from "./campaignTableBody";

const CampaignTable = ({ userproductInfo }) => {
  return (
    <section className="w-full gap-6 shadow px-2 md:px-5 py-[18px] rounded-[14px] mt-10 border">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-primary font-semibold text-[20px]">My Products</h2>
      </div>
      <div className="flex max-w-full overflow-x-auto w-full">
        <Table
          tableHeads={[
            "Product Name",
            "Type",
            "Sales",
            "Revenue",
            "Product Link",
          ]}
        >
          <TableBody tableData={userproductInfo} />
        </Table>
      </div>
    </section>
  );
};

export default CampaignTable;
