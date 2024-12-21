"use client";

import React, { useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import AlreadyHaveAccount from "@/components/Register/AlreadyHaveAccount";

import RegisterForm from "@/components/Register/RegisterForm";

const Register = () => {
  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-white" />
        <Breadcrumb
          heading="Create An Account"
          subHeading="Create An Account"
        />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <RegisterForm />
            </div>
            <AlreadyHaveAccount />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
