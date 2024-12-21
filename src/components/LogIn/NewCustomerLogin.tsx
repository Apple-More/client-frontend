import React from "react";
import Link from "next/link";

const NewCustomerLogin = () => {
  return (
    <>
      <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
        <div className="text-content">
          <div className="heading4">New Customer</div>
          <div className="mt-2 text-secondary">
            Be part of our growing family of new customers! Join us today and
            unlock a world of exclusive benefits, offers, and personalized
            experiences.
          </div>
          <div className="block-button md:mt-7 mt-4">
            <Link href={"/register"} className="button-main">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCustomerLogin;
