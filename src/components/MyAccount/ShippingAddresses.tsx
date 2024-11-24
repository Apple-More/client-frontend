import React, { useEffect, useState } from "react";
import EditAddressPopup from "./EditAddressPopup";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  editShippingAddress,
  getShippingAddresses,
} from "@/services/ShippingAddressServices";

interface Address {
  id: string; // Assuming each address has a unique ID
  firstName: string;
  lastName: string;
  addressNo: string;
  street: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
}

const ShippingAddresses: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch addresses from the backend
    const fetchAddresses = async () => {
      try {
        const response = await getShippingAddresses(user?.customerId);
        setAddresses(response.data); // Update state with fetched addresses
      } catch (error) {
        console.error("Failed to fetch shipping addresses:", error);
      }
    };

    fetchAddresses();
  }, [user?.customerId]);

  const handleEditClick = (address: Address) => {
    setSelectedAddress(address); // Set the selected address
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAddress(null); // Reset the selected address
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        // Update the address on the backend
        await editShippingAddress(selectedAddress, selectedAddress.id);
        console.log("Address updated successfully:", selectedAddress);
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === selectedAddress.id ? selectedAddress : addr
          )
        ); // Update state with the modified address
      }
    } catch (error) {
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
        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
          <div className="heading4">Shipping Addresses</div>
          <div className="body1 mt-2">Manage your shipping addresses here</div>
          <div className="mt-7">
            {addresses.map((address) => (
              <div
                key={address.id}
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
                    <div className="heading5">{`${address.firstName} ${address.lastName}`}</div>
                    <div className="body1 mt-1">
                      {`${address.street}, ${address.city}, ${address.province}, ${address.zip}, ${address.country}`}
                    </div>
                  </div>
                </div>
                <div className="address-action">
                  <button
                    className="button-main"
                    onClick={() => handleEditClick(address)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
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
