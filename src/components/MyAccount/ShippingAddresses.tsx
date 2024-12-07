import React, { useEffect, useState } from "react";
import EditAddressPopup from "./EditAddressPopup";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  editShippingAddress,
  getShippingAddresses,
} from "@/services/ShippingAddressServices";
import { toast } from "react-toastify";
import { Address } from "@/type/AddressType";

const ShippingAddresses: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await getShippingAddresses(user?.userId);
      setAddresses(response.data.data); // Update state with fetched addresses
      console.log("Addresses:", addresses);
    } catch (error) {
      console.error("Failed to fetch shipping addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAddress(null); // Reset the selected address
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        // Update the address on the backend
        await editShippingAddress(
          user?.userId,
          selectedAddress,
          selectedAddress.addressId
        );
        toast.success("Address updated successfully");
        console.log("Address updated successfully:", selectedAddress);
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.addressId === selectedAddress.addressId
              ? selectedAddress
              : addr
          )
        ); // Update state with the modified address
      }
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
      console.error("Failed to update address:", error);
    } finally {
      setIsPopupOpen(false); // Close the popup
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedAddress((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  return (
    <div className="container">
      <div className="content-main flex gap-y-8 max-md:flex-col">
        <div className=" w-full ">
          <div className="heading4">Shipping Addresses</div>
          <div className="body1 mt-2">Manage your shipping addresses here</div>
          <div className="mt-7">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.addressId}
                  className="address-card flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div className="address-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-map-pin"
                      >
                        <circle cx="12" cy="10" r="3"></circle>
                        <line x1="12" y1="21" x2="12" y2="14"></line>
                        <path d="M5 18a9 9 0 0 1 14-7"></path>
                      </svg>
                    </div>
                    <div className="address-info ml-3">
                      <div className="body1 mt-1">
                        {`${address.addressNo}, ${address.addressLine1}, ${address.addressLine2}, ${address.street}, ${address.city}, ${address.province}, ${address.country}, ${address.zipCode}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Addresses Found</p>
            )}
          </div>
        </div>
      </div>

      {/* Render Popup */}
      {isPopupOpen && selectedAddress && (
        <EditAddressPopup
          formData={selectedAddress}
          onChange={handleInputChange}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default ShippingAddresses;
