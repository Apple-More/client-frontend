"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OTPVerificationForm = () => {
  const [OTP, setOTP] = useState("");
  const router = useRouter();
  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push("/reset-password");
    } catch (error) {
      console.error("OTP Verification failed:", error);
    }
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleOTPVerification}>
        <div className="email ">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg appearance-none"
            id="OTP"
            type="text"
            placeholder="Enter OTP received to your Email *"
            required
            value={OTP}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setOTP(e.target.value); // Allows only numeric input
              }
            }}
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

export default OTPVerificationForm;
