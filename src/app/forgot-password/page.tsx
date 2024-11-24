"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import NewCustomerLogin from "@/components/LogIn/NewCustomerLogin";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb
          heading="Forget your password"
          subHeading="Forget your password"
        />
      </div>
      <div className="forgot-pass md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Forgot your password</div>

              <div className="body1 mt-2">
                We will send you an email to reset your password
                <ForgotPasswordForm />
              </div>
            </div>
            <NewCustomerLogin />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
