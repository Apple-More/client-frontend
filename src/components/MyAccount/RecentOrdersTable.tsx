import { getRecentOrders } from "@/services/OrderServices";
import React, { useEffect, useState } from "react";

const RecentOrdersTable = () => {
  const [records, setRecords] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fetchRecentOrders = async () => {
    try {
      const response = await getRecentOrders(user?.userId);
      if (Array.isArray(response.data.data)) {
        const orders = response.data.data.map((order: any) => ({
          orderId: order.orderId,
          created_date_time: order.created_date_time,
          sale: order.order_items.reduce(
            (total: number, item: any) => total + item.price,
            0
          ), // Sum of all item prices
          order_status: order.order_status,
          orderItems: order.order_items.map((item: any) => ({
            productName: item.product.productName,
            quantity: item.quantity,
          })),
        }));
        setRecords(orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);
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
          {records.map((order) => (
            <tr key={order.orderId} className="border-b border-line">
              {/* Order ID */}
              <td className="py-2 text-left text-sm text-primary whitespace-nowrap">
                {order.orderId}
              </td>
              {/* Products */}
              <td className="py-2 text-left text-sm text-primary whitespace-nowrap">
                <ul>
                  {order.orderItems.map(
                    (
                      item: { productName: string; quantity: number },
                      index: number
                    ) => (
                      <li key={index}>
                        {item.productName} (Qty: {item.quantity})
                      </li>
                    )
                  )}
                </ul>
              </td>
              {/* Pricing */}
              <td className="py-2 text-left text-sm text-primary whitespace-nowrap">
                ${order.sale.toFixed(2)}
              </td>
              {/* Status */}
              <td className="py-2 text-right text-sm text-primary whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    order.order_status === "payment_completed"
                      ? "bg-success"
                      : order.order_status === "payment_pending"
                      ? "bg-warning"
                      : order.order_status === "shipped"
                      ? "bg-info"
                      : order.order_status === "cancelled"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {order.order_status.replace(/_/g, " ").toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecentOrdersTable;
