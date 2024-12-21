import React from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ModalWishlistProvider } from "@/context/ModalWishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalCompareProvider } from "@/context/ModalCompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalCartProvider>
          <WishlistProvider>
            <ModalWishlistProvider>
              <CompareProvider>
                <ModalCompareProvider>
                  <ModalSearchProvider>
                    <ModalQuickviewProvider>{children}</ModalQuickviewProvider>
                  </ModalSearchProvider>
                </ModalCompareProvider>
              </CompareProvider>
            </ModalWishlistProvider>
          </WishlistProvider>
        </ModalCartProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default GlobalProvider;
