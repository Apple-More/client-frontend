"use client";
import React from "react";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import OTPVerificationForm from "@/components/OTPVerification/OTPVerificationForm";

const OTPVerification = () => {
  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="OTP Verification" subHeading="OTP Verification" />
      </div>
      <div className="forgot-pass md:py-20 py-10">
        <div className="container ">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="content-center justify-center">
              <div className="heading4">Enter OTP Code</div>
              <div className="body1 mt-2">
                We sent a OTP Code to your email. Please enter it here.
              </div>
              <OTPVerificationForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OTPVerification;
