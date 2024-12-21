import React from "react";
import Link from "next/link";

const AlreadyHaveAccount = () => {
  return (
    <>
      <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
        <div className="text-content">
          <div className="heading4">Already have an account?</div>
          <div className="mt-2 text-secondary">
            Welcome back. Sign in to access your personalized experience, saved
            preferences, and more. We{String.raw`'re`} thrilled to have you with
            us again!
          </div>
          <div className="block-button md:mt-7 mt-4">
            <Link href={"/login"} className="button-main">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlreadyHaveAccount;
