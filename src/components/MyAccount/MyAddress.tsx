"use client";

import * as Icon from "@phosphor-icons/react/dist/ssr";
import React from "react";
import BillingAddress from "./BillingAddress";
import ShippingAddressForm from "./ShippingAddressForm";
import ShippingAddresses from "./ShippingAddresses";

interface MyAddressProps {
  activeAddress: string | null | undefined;

  setActiveAddress: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  onAction: (action: string) => void;
}

const MyAddress: React.FC<MyAddressProps> = ({
  activeAddress,
  setActiveAddress,
  onAction,
}) => {
  return (
    <>
      <ShippingAddresses />
      <ShippingAddressForm
        activeAddress={activeAddress}
        setActiveAddress={setActiveAddress}
        onAction={onAction}
      />
    </>
  );
};

export default MyAddress;
