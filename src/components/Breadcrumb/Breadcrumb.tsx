import React from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@/context/AuthContext";

interface Pros {
  heading: string;
  subHeading: string;
}

const Breadcrumb: React.FC<Pros> = ({ heading, subHeading }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="h-16"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
