"use client";

import Footer from "@/components/Footer/Footer";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "@/components/ChangePassword/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Change Password" subHeading="Change Password" />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] ">
              <div className="heading4">Change Password</div>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
