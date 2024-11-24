"use client";
import React, { useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import RecentOrdersTable from "@/components/MyAccount/RecentOrdersTable";
import AwaitingPickupsCount from "@/components/MyAccount/AwaitingPickupsCount";
import CancelledOrderCount from "@/components/MyAccount/CancelledOrderCount";
import TotalOrderCount from "@/components/MyAccount/TotalOrderCount";
import InternalDashboard from "@/components/MyAccount/InternalDashboard";
import YourOrders from "@/components/MyAccount/YourOrders";
import HistoryOrderList from "@/components/MyAccount/HistoryOrderList";
import MyAddress from "@/components/MyAccount/MyAddress";
import MySettings from "@/components/MyAccount/MySettings";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>("dashboard");
  const [activeAddress, setActiveAddress] = useState<string | null | undefined>(
    "billing"
  );
  const [openDetail, setOpenDetail] = useState<boolean | undefined>(false);

  const handleActiveAddress = (order: string) => {
    setActiveAddress((prevOrder) => (prevOrder === order ? null : order));
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="My Account" subHeading="My Account" />
      </div>
      <div className="profile-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col w-full">
            <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
              <InternalDashboard
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="right md:w-2/3 w-full pl-2.5">
              <div
                className={`tab text-content w-full ${
                  activeTab === "dashboard" ? "block" : "hidden"
                }`}
              >
                <div className="overview grid sm:grid-cols-3 gap-5">
                  <AwaitingPickupsCount />
                  <CancelledOrderCount />
                  <TotalOrderCount />
                </div>
                <div className="recent_order pt-5 px-5 pb-2 mt-7 border border-line rounded-xl">
                  <h6 className="heading6">Recent Orders</h6>
                  <div className="list overflow-x-auto w-full mt-5">
                    <RecentOrdersTable />
                  </div>
                </div>
              </div>
              <div
                className={`tab text-content overflow-hidden w-full p-7 border border-line rounded-xl ${
                  activeTab === "orders" ? "block" : "hidden"
                }`}
              >
                <YourOrders />
                <HistoryOrderList
                  openDetail={openDetail}
                  setOpenDetail={setOpenDetail}
                />
              </div>

              <div
                className={`tab_address text-content w-full p-7 border border-line rounded-xl ${
                  activeTab === "address" ? "block" : "hidden"
                }`}
              >
                <MyAddress
                  activeAddress={activeAddress}
                  setActiveAddress={setActiveAddress}
                  onAction={handleActiveAddress}
                />
              </div>
              <div
                className={`tab text-content w-full p-7 border border-line rounded-xl ${
                  activeTab === "setting" ? "block" : "hidden"
                }`}
              >
                <MySettings />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
