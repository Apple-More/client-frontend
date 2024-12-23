"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Product from "@/components/Product/Product";
import productData from "@/data/Product.json";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  props: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  let [selectedType, setSelectedType] = useState<string | null>();
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const { openModalCart } = useModalCartContext();
  const { cartState } = useCart();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalSearch } = useModalSearchContext();

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    // Gắn sự kiện cuộn khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);


  return (
    <>
      <div
        className={`header-menu style-one ${
          fixedHeader ? "fixed" : "absolute"
        } top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <div className="left flex items-center gap-16">
              <Link
                href={"/"}
                className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
              >
                <div className="heading4">AppleMore</div>
              </Link>
              <div className="menu-main h-full max-lg:hidden">
                <ul className="flex items-center gap-8 h-full">
                  <li className="h-full relative">
                    <Link
                      href="/"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                        pathname === "/" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link
                      href="/search-result"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                        pathname.includes("/product/") ? "active" : ""
                      }`}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="h-full">
                    <Link
                      href="/store-list"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                        pathname.includes("/store-list") ? "active" : ""
                      }`}
                    >
                      Shops
                    </Link>
                  </li>
                  <li className="h-full relative">
                    <Link
                      href="/about"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                        pathname.includes("/about") ? "active" : ""
                      }`}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="h-full relative">
                    <Link
                      href="#!"
                      className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                        pathname.includes("/pages") ? "active" : ""
                      }`}
                    >
                      Contact Us
                    </Link>
                    <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                      <ul className="w-full">
                        <li>
                          <Link
                            href="/pages/contact"
                            className={`link text-secondary duration-300 ${
                              pathname === "/pages/contact" ? "active" : ""
                            }`}
                          >
                            Contact Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pages/faqs"
                            className={`link text-secondary duration-300 ${
                              pathname === "/pages/faqs" ? "active" : ""
                            }`}
                          >
                            FAQs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pages/customer-feedbacks"
                            className={`link text-secondary duration-300 ${
                              pathname === "/pages/customer-feedbacks"
                                ? "active"
                                : ""
                            }`}
                          >
                            Customer Feedbacks
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right flex gap-12">
              <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                <Icon.MagnifyingGlass
                  size={24}
                  color="black"
                  onClick={openModalSearch}
                />
                <div className="line absolute bg-line w-px h-6 -right-6"></div>
              </div>
              <div className="list-action flex items-center gap-4">
                <div className="user-icon flex items-center justify-center cursor-pointer">
                  <Icon.User
                    size={24}
                    color="black"
                    onClick={handleLoginPopup}
                  />
                  <div
                    className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm 
                                            ${openLoginPopup ? "open" : ""}`}
                  >
                    {isAuthenticated ? (
                      <Link
                        href="/my-account"
                        className="button-main w-full text-center"
                      >
                        My Account
                      </Link>
                    ) : (
                      <>
                        <Link
                          href={"/login"}
                          className="button-main w-full text-center"
                        >
                          Login
                        </Link>
                        <div className="text-secondary text-center mt-3 pb-4">
                          Don’t have an account?
                          <Link
                            href={"/register"}
                            className="text-black pl-1 hover:underline"
                          >
                            Register
                          </Link>
                        </div>
                      </>
                    )}

                    <div className="bottom pt-4 border-t border-line"></div>
                    <Link href={"#!"} className="body1 hover:underline">
                      Support
                    </Link>
                  </div>
                </div>
                <div
                  className="cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  Applemore
                </Link>
              </div>
              <div className="form-search relative mt-2">
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=" h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4"
                />
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <a
                      href={"/"}
                      className={`text-xl font-semibold flex items-center justify-between`}
                    >
                      Home
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(4)}
                  >
                    <a
                      href={"/homepages/marketplace"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Products
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(4)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-3 pb-12">
                        <div className="">
                          <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                            <div className="nav-item">
                              <div className="text-button-uppercase pb-1">
                                Products Features
                              </div>
                              <ul>
                                <li>
                                  <Link
                                    href={"/product/default"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/default"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Defaults
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/sale"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/sale"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Sale
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/countdown-timer"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/countdown-timer"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Countdown Timer
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/grouped"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/grouped"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Grouped
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/bought-together"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/bought-together"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Frequently Bought Together
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/out-of-stock"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/out-of-stock"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Out Of Stock
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/variable"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/variable"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Variable
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="nav-item">
                              <div className="text-button-uppercase pb-1">
                                Products Features
                              </div>
                              <ul>
                                <li>
                                  <Link
                                    href={"/product/external"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/external"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products External
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/on-sale"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/on-sale"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products On Sale
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/discount"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/discount"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products With Discount
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/sidebar"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/sidebar"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products With Sidebar
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/fixed-price"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/fixed-price"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Fixed Price
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="nav-item col-span-2">
                              <div className="text-button-uppercase pb-1">
                                Products Layout
                              </div>
                              <ul>
                                <li>
                                  <Link
                                    href={"/product/thumbnail-left"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/thumbnail-left"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Thumbnails Left
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/thumbnail-bottom"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/thumbnail-bottom"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Thumbnails Bottom
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/one-scrolling"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/one-scrolling"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Grid 1 Scrolling
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/two-scrolling"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/two-scrolling"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Grid 2 Scrolling
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/combined-one"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/combined-one"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Combined 1
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={"/product/combined-two"}
                                    className={`link text-secondary duration-300 ${
                                      pathname === "/product/combined-two"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Products Combined 2
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="recent-product pt-4">
                            <div className="text-button-uppercase pb-1">
                              Recent Products
                            </div>
                            <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                              {productData.slice(0, 2).map((prd, index) => (
                                <Product key={index} data={prd} type="grid" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(3)}
                  >
                    <a
                      href={"/store-list"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Shops
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(5)}
                  >
                    <a
                      href={"/about"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      About Us
                    </a>
                  </li>
                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(6)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl font-semibold flex items-center justify-between mt-5"
                    >
                      Contact Us
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(6)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul className="w-full">
                          <li>
                            <Link
                              href="/pages/contact"
                              className={`link text-secondary duration-300 ${
                                pathname === "/pages/contact" ? "active" : ""
                              }`}
                            >
                              Contact Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/faqs"
                              className={`link text-secondary duration-300 ${
                                pathname === "/pages/faqs" ? "active" : ""
                              }`}
                            >
                              FAQs
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/customer-feedbacks"
                              className={`link text-secondary duration-300 ${
                                pathname === "/pages/customer-feedbacks"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Customer Feedbacks
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOne;
