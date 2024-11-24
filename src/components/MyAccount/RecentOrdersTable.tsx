import React from "react";

const RecentOrdersTable = () => {
  return (
    <>
      <table className="w-full max-[1400px]:w-[700px] max-md:w-[700px]">
        <thead className="border-b border-line">
          <tr>
            <th
              scope="col"
              className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap"
            >
              Order
            </th>
            <th
              scope="col"
              className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap"
            >
              Products
            </th>
            <th
              scope="col"
              className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap"
            >
              Pricing
            </th>
            <th
              scope="col"
              className="pb-3 text-right text-sm font-bold uppercase text-secondary whitespace-nowrap"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Map Data</td>
            <td>Map Data</td>
            <td>Map Data</td>
            <td className="text-right">Map Data</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default RecentOrdersTable;
