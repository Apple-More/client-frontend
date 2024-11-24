"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@/context/AuthContext";

interface InternalDashboardProps {
  activeTab: string | undefined;
  setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const InternalDashboard: React.FC<InternalDashboardProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl">
        <div className="heading flex flex-col items-center justify-center">
          <div className="avatar">
            <Image
              src={"/images/avatar/1.png"}
              width={300}
              height={300}
              alt="avatar"
              className="md:w-[140px] w-[120px] md:h-[140px] h-[120px] rounded-full"
            />
          </div>
          <div className="name heading6 mt-4 text-center">
            {user?.customerName}
          </div>
          <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1">
            {user?.email}
          </div>
        </div>
        <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
          <Link
            href={"#!"}
            scroll={false}
            className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Icon.HouseLine size={20} />
            <strong className="heading6">Dashboard</strong>
          </Link>
          <Link
            href={"#!"}
            scroll={false}
            className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${
              activeTab === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <Icon.Package size={20} />
            <strong className="heading6">History Orders</strong>
          </Link>
          <Link
            href={"#!"}
            scroll={false}
            className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${
              activeTab === "address" ? "active" : ""
            }`}
            onClick={() => setActiveTab("address")}
          >
            <Icon.Tag size={20} />
            <strong className="heading6">My Address</strong>
          </Link>
          <Link
            href={"#!"}
            scroll={false}
            className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${
              activeTab === "setting" ? "active" : ""
            }`}
            onClick={() => setActiveTab("setting")}
          >
            <Icon.GearSix size={20} />
            <strong className="heading6">Settings</strong>
          </Link>
          <Link
            href={"/login"}
            className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5"
          >
            <Icon.SignOut size={20} />
            <strong className="heading6" onClick={handleLogOut}>
              Logout
            </strong>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InternalDashboard;
