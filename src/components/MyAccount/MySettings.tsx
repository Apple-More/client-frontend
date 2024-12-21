"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import ChangePassword from "../../app/change-password/page";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const MySettings = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = {
      customerName: formData.customerName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    try {
    } catch (error) {
      console.error("Save Changes failed:", error);
    }
  };
  const { user } = useAuth();
  return (
    <>
      <form onSubmit={handleSaveChanges}>
        <div className="heading5 pb-4">Information</div>
        <div className="upload_image col-span-full">
          <label htmlFor="uploadImage">
            Upload Avatar: <span className="text-red">*</span>
          </label>
          <div className="flex flex-wrap items-center gap-5 mt-3">
            <div className="bg_img flex-shrink-0 relative w-[7.5rem] h-[7.5rem] rounded-lg overflow-hidden bg-surface">
              <span className="ph ph-image text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary"></span>
              <Image
                src={"/images/avatar/1.png"}
                width={300}
                height={300}
                alt="avatar"
                className="upload_img relative z-[1] w-full h-full object-cover"
              />
            </div>
            <div>
              <strong className="text-button">Upload File:</strong>
              <p className="caption1 text-secondary mt-1">JPG 120x120px</p>
              <div className="upload_file flex items-center gap-3 w-[220px] mt-3 px-3 py-2 border border-line rounded">
                <label
                  htmlFor="uploadImage"
                  className="caption2 py-1 px-3 rounded bg-line whitespace-nowrap cursor-pointer"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  name="uploadImage"
                  id="uploadImage"
                  accept="image/*"
                  className="caption2 cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
          <div className="first-name">
            <label htmlFor="firstName" className="caption1 capitalize">
              Name <span className="text-red">*</span>
            </label>
            <input
              className="border-line mt-2 px-4 py-3 w-full rounded-lg"
              id="customerName"
              type="text"
              defaultValue={user?.customerName}
              placeholder="Name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="phone-number">
            <label htmlFor="phoneNumber" className="caption1 capitalize">
              Phone Number <span className="text-red">*</span>
            </label>
            <input
              className="border-line mt-2 px-4 py-3 w-full rounded-lg"
              id="phoneNumber"
              type="text"
              defaultValue={user?.phoneNumber}
              placeholder="Phone number"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="email">
            <label htmlFor="email" className="caption1 capitalize">
              Email Address <span className="text-red">*</span>
            </label>
            <input
              className="border-line mt-2 px-4 py-3 w-full rounded-lg"
              id="email"
              type="email"
              defaultValue={user?.email}
              placeholder="Email address"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="block-button lg:mt-10 mt-6">
          <button className="button-main bg-black" type="submit">
            Save Changes
          </button>
        </div>
      </form>
      <div className="heading5 pb-4 lg:mt-10 mt-6">Change Password</div>
      <div className="block-button lg:mt-10 mt-6">
        <button className="button-main">
          <Link href="/change-password">Click Here to Change Password</Link>
        </button>
      </div>
    </>
  );
};

export default MySettings;
