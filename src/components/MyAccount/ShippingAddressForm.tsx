"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { addShippingAddress } from "@/services/ShippingAddressServices";
import { toast } from "react-toastify";

interface ShippingAddressFormProps {
  activeAddress: string | null | undefined;

  setActiveAddress: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  onAction: (action: string) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  activeAddress,
  setActiveAddress,
  onAction,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    addressId: "",
    addressNo: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
    phone: "",
  });

  const handleAddShippingAddress = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      await addShippingAddress(user?.customerId, formData);
      toast.success("Shipping address added successfully");
    } catch (error) {
      toast.error("Failed to add shipping address");
      console.error("Failed to add shipping address:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleAddShippingAddress}>
        <button
          type="button"
          className={`tab_btn flex items-center justify-between w-full mt-10 pb-1.5 border-b border-line ${
            activeAddress === "shipping" ? "active" : ""
          }`}
          onClick={() => onAction("shipping")}
        >
          <strong className="heading6">Add New Shipping Address</strong>
          <Icon.CaretDown className="text-2xl ic_down duration-300" />
        </button>
        <div
          className={`form_address ${
            activeAddress === "shipping" ? "block" : "hidden"
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
            {/* <div className="first-name">
              <label
                htmlFor="shippingFirstName"
                className="caption1 capitalize"
              >
                First Name <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingFirstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="last-name">
              <label htmlFor="shippingLastName" className="caption1 capitalize">
                Last Name <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingLastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="company">
              <label htmlFor="addressNo" className="caption1 capitalize">
                Address No <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="addressNo"
                type="text"
                required
                value={formData.addressNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="addressLine1">
              <label htmlFor="addressLine1" className="caption1 capitalize">
                Address Line 1 <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="addressLine1"
                type="text"
                required
                value={formData.addressLine1}
                onChange={handleInputChange}
              />
            </div>
            <div className="addressLine2">
              <label htmlFor="addressLine2" className="caption1 capitalize">
                Address Line 2 <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="addressLine2"
                type="text"
                required
                value={formData.addressLine2}
                onChange={handleInputChange}
              />
            </div>
            <div className="street">
              <label htmlFor="shippingStreet" className="caption1 capitalize">
                street address <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingStreet"
                type="text"
                required
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="city">
              <label htmlFor="shippingCity" className="caption1 capitalize">
                Town / city <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingCity"
                type="text"
                required
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="state">
              <label htmlFor="shippingState" className="caption1 capitalize">
                Province <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingState"
                type="text"
                required
                value={formData.province}
                onChange={handleInputChange}
              />
            </div>
            <div className="country">
              <label htmlFor="shippingCountry" className="caption1 capitalize">
                Country / Region <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingCountry"
                type="text"
                required
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="zip">
              <label htmlFor="shippingZip" className="caption1 capitalize">
                Postal Code / ZIP Code <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingZip"
                type="text"
                required
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="phone">
              <label htmlFor="shippingPhone" className="caption1 capitalize">
                Phone <span className="text-red">*</span>
              </label>
              <input
                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                id="shippingPhone"
                type="text"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="block-button lg:mt-10 mt-6">
          <button className="button-main">Add Shipping Address</button>
        </div>
      </form>
    </>
  );
};

export default ShippingAddressForm;
