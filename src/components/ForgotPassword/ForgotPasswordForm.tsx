"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/otp-verification");
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleForgotPassword}>
        <div className="email ">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="username"
            type="email"
            placeholder="Username or email address *"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="block-button md:mt-7 mt-4">
          <button className="button-main bg-black" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
