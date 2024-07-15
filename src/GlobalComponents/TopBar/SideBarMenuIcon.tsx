import { useGlobalContext } from "@/app/context/GlobalContext";
import React from "react";

const SideBarMenuIcon: React.FC = () => {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();

  return (
    <>
      {!openSideBar ? (
        <svg
          viewBox="0 0 24 24"
          fill="#111"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden max-md:block"
          width={40}
          height={40}
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Menu / Menu_Alt_02">
              <path
                id="Vector"
                d="M11 17H19M5 12H19M11 7H19"
                stroke="#cbc8c8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#111"
          width={40}
          height={40}
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#828282"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            ></path>
          </g>
        </svg>
      )}
    </>
  );
};

export default SideBarMenuIcon;
