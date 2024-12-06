"use client";
import React from "react";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import NewCustomerLogin from "@/components/LogIn/NewCustomerLogin";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LogIn/LoginForm";

const Login = () => {
  const { login, isAuthenticated } = useAuth();

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Login" subHeading="Login" />
      </div>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Login</div>
              {isAuthenticated ? "" : <LoginForm />}
            </div>
            <NewCustomerLogin />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
